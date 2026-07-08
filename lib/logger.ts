type LogMeta = Record<string, unknown>;

function format(meta?: LogMeta) {
  return meta ? ` ${JSON.stringify(meta)}` : "";
}

export const logger = {
  info(message: string, meta?: LogMeta) {
    console.info(`[info] ${message}${format(meta)}`);
  },
  warn(message: string, meta?: LogMeta) {
    console.warn(`[warn] ${message}${format(meta)}`);
  },
  error(message: string, meta?: LogMeta) {
    console.error(`[error] ${message}${format(meta)}`);
  },
};
