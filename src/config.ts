import toppings from './toppings'

// TODO: Performance - Consider dynamically adjusting chunk size based on network conditions
// TODO: Security - Add rate limiting configuration for password attempts
// TODO: UX - Make TTL configurable per-channel or add tiered expiration (e.g., 1h, 24h, 7d)

export default {
  redisURL: 'redis://localhost:6379/0',
  channel: {
    ttl: 60 * 60, // 1 hour
  },
  bodyKeys: {
    uploaderPeerID: {
      min: 3,
      max: 256,
    },
    slug: {
      min: 3,
      max: 256,
    },
  },
  shortSlug: {
    numChars: 8,
    chars: '0123456789abcdefghijklmnopqrstuvwxyz',
    maxAttempts: 8,
  },
  longSlug: {
    numWords: 4,
    words: toppings,
    maxAttempts: 8,
  },
}
