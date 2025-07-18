import { Request, Response } from 'express';
import { publishBotCommand } from '../lib/redis';

// In-memory store (replace with DB in production)
const botStatus = {
  helper: { running: false, lastHeartbeat: null as Date | null },
  analysis: { running: false, lastHeartbeat: null as Date | null }
};

export const enableBot = async (req: Request, res: Response ) => {
  try {
    await publishBotCommand('START_BOT', { botName: req.body.botName });
    return res.json({ message: 'Bot start command sent.' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to send start command.'  });
  }
};

export const disableBot = async (req: Request, res: Response) => {
  try {
    await publishBotCommand('STOP_BOT', { botName: req.body.botName });
    return res.json({ message: 'Bot stop command sent.' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to send stop command.'  });
  }
};
export const getStatus = (req: Request, res: Response) => {
  res.json({
    bots: [
      {
        type: "helper",
        status: botStatus.helper.running ? "running" : "stopped",
        last_heartbeat: botStatus.helper.lastHeartbeat?.toISOString() || null
      },
      {
        type: "analysis",
        status: botStatus.analysis.running ? "running" : "stopped",
        last_heartbeat: botStatus.analysis.lastHeartbeat?.toISOString() || null
      }
    ]
  });
};

export const heartbeat = (req: Request, res: Response) => {
  const { bot_type } = req.body;

  res.json({
    status: "success",
    bot_type
  });
};

export const resetBot = (req: Request, res: Response) => {
  const { bot_type } = req.body;

  if (!['helper', 'analysis'].includes(bot_type)) {
    return res.status(400).json({ error: "Invalid bot_type" });
  }

 

  res.json({
    status: "success",
    bot_type,
    action: "reset",
    timestamp: new Date().toISOString()
  });
};

export const getBotStatus = (req: Request, res: Response) => {
  const { bot_type } = req.query;

  if (bot_type && !['helper', 'analysis'].includes(bot_type as string)) {
    return res.status(400).json({ error: "Invalid bot_type" });
  }
  res.json(botStatus);
};

export const getBotLogs = (req: Request, res: Response) => {
  // Placeholder for bot logs
  // In a real application, you would fetch logs from a database or log service
  const logs = [
    { timestamp: new Date().toISOString(), message: "Bot started" },
    { timestamp: new Date().toISOString(), message: "Heartbeat received" }
  ];

  res.json({ logs });
};

export const getConsoleOutput = (req: Request, res: Response) => {
  // Placeholder for console output
  // In a real application, you would fetch console output from a logging service
  const consoleOutput = [
    { timestamp: new Date().toISOString(), message: "Bot initialized" },
    { timestamp: new Date().toISOString(), message: "Action performed" }
  ];

  res.json({ consoleOutput });
}

export const clearBotLogs = (req: Request, res: Response) => {
  // Placeholder for clearing logs
  // In a real application, you would clear logs from a database or log service
  res.json({ status: "success", message: "Bot logs cleared" });
};

export const clearConsoleOutput = (req: Request, res: Response) => {
  // Placeholder for clearing console output
  // In a real application, you would clear console output from a logging service
  res.json({ status: "success", message: "Console output cleared" });
};

export const getBotConfig = (req: Request, res: Response) => {
  // Placeholder for bot configuration
  // In a real application, you would fetch configuration from a database or config service
  const config = {
    helper: { enabled: true, interval: 60000 },
    analysis: { enabled: false, interval: 300000 }
  };

  res.json({ config });
};

export const updateBotConfig = (req: Request, res: Response) => {
  const { bot_type, config } = req.body;

  if (!['helper', 'analysis'].includes(bot_type)) {
    return res.status(400).json({ error: "Invalid bot_type" });
  }

};

export const getBotMetrics = (req: Request, res: Response) => {
  // Placeholder for bot metrics
  // In a real application, you would fetch metrics from a monitoring service
  const metrics = {
    helper: { uptime: "1h", requests: 100, errors: 2 },
    analysis: { uptime: "30m", requests: 50, errors: 0 }
  };

  res.json({ metrics });
};

export const getBotPerformance = (req: Request, res: Response) => {
  // Placeholder for bot performance data
  // In a real application, you would fetch performance data from a monitoring service
  const performance = {
    helper: { responseTime: "200ms", successRate: "98%" },
    analysis: { responseTime: "150ms", successRate: "99%" }
  };

  res.json({ performance });
};

export const getBotHealth = (req: Request, res: Response) => {
  // Placeholder for bot health check
  // In a real application, you would perform actual health checks
  const health = {
    helper: { status: "healthy", lastChecked: new Date().toISOString() },
    analysis: { status: "healthy", lastChecked: new Date().toISOString() }
  };

  res.json({ health });
};

export const getBotAlerts = (req: Request, res: Response) => {
  // Placeholder for bot alerts
  // In a real application, you would fetch alerts from a monitoring service
  const alerts = [
    { timestamp: new Date().toISOString(), message: "High CPU usage detected" },
    { timestamp: new Date().toISOString(), message: "Memory leak in analysis bot" }
  ];

  res.json({ alerts });
};

export const getBotNotifications = (req: Request, res: Response) => {
  // Placeholder for bot notifications
  // In a real application, you would fetch notifications from a notification service
  const notifications = [
    { timestamp: new Date().toISOString(), message: "New update available for helper bot" },
    { timestamp: new Date().toISOString(), message: "Analysis bot completed processing" }
  ];

  res.json({ notifications });
};

