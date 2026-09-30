import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const N8N_FORM_URL = 'https://rohini117.app.n8n.cloud/form/e1b7b0de-ccfa-4683-a143-07ee8b609a80';

// In-memory upload buffer (max 15MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health / Connection status endpoint
app.get('/api/n8n-status', async (_req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const checkRes = await fetch(N8N_FORM_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'ResumePulse/1.0 (HealthCheck)',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const latencyMs = Date.now() - startTime;
    return res.json({
      online: checkRes.status === 200,
      statusCode: checkRes.status,
      latencyMs,
      endpoint: N8N_FORM_URL,
      formTitle: 'Resume Analyzer',
      lastChecked: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const latencyMs = Date.now() - startTime;
    const message = err instanceof Error ? err.message : 'Unknown connection error';
    return res.json({
      online: false,
      error: message,
      latencyMs,
      endpoint: N8N_FORM_URL,
      lastChecked: new Date().toISOString(),
    });
  }
});

// Resume Submission Proxy Endpoint
app.post(
  '/api/submit-resume',
  upload.fields([
    { name: 'field-2', maxCount: 5 },
    { name: 'resume', maxCount: 5 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const name = (req.body['field-0'] || req.body['name'] || '').toString().trim();
      const email = (req.body['field-1'] || req.body['email'] || '').toString().trim();
      const targetRole = (req.body['targetRole'] || '').toString().trim();
      const experienceLevel = (req.body['experienceLevel'] || '').toString().trim();

      if (!name) {
        return res.status(400).json({ success: false, error: 'Candidate name is required.' });
      }
      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'A valid email address is required.' });
      }

      // Extract uploaded files
      const filesMap = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const uploadedFiles = [
        ...(filesMap?.['field-2'] || []),
        ...(filesMap?.['resume'] || []),
      ];

      if (uploadedFiles.length === 0) {
        return res.status(400).json({ success: false, error: 'Please upload at least one resume file.' });
      }

      // Build standard FormData to forward to the n8n form webhook
      const formData = new FormData();
      formData.append('field-0', name);
      formData.append('field-1', email);

      for (const file of uploadedFiles) {
        const fileBlob = new Blob([new Uint8Array(file.buffer)], {
          type: file.mimetype || 'application/octet-stream',
        });
        formData.append('field-2', fileBlob, file.originalname);
      }

      // Forward to n8n
      const upstreamResponse = await fetch(N8N_FORM_URL, {
        method: 'POST',
        body: formData,
      });

      const responseText = await upstreamResponse.text();
      let responseJson: Record<string, unknown> | null = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch {
        // Not JSON
      }

      if (upstreamResponse.status >= 200 && upstreamResponse.status < 300) {
        return res.json({
          success: true,
          status: upstreamResponse.status,
          message: 'Resume submitted successfully! The n8n automated workflow has been triggered.',
          submissionId: `RP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
          details: {
            name,
            email,
            targetRole: targetRole || 'General Professional',
            experienceLevel: experienceLevel || 'Not specified',
            filesUploaded: uploadedFiles.map((f) => ({
              name: f.originalname,
              sizeBytes: f.size,
              mimeType: f.mimetype,
            })),
          },
          n8nResponse: responseJson || { raw: responseText.slice(0, 300) },
        });
      } else {
        return res.status(upstreamResponse.status).json({
          success: false,
          error: `The n8n automation service responded with status ${upstreamResponse.status}.`,
          details: responseText.slice(0, 500),
        });
      }
    } catch (error: unknown) {
      console.error('Error forwarding submission to n8n:', error);
      const message = error instanceof Error ? error.message : 'Unknown server error';
      return res.status(500).json({
        success: false,
        error: 'Failed to process and forward resume to the n8n workflow.',
        details: message,
      });
    }
  }
);

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://0.0.0.0:${port} [mode: ${isProduction ? 'production' : 'development'}]`);
  });
}

startServer();
