import sanitizeHtml from 'sanitize-html'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li',
  'h2', 'h3', 'h4', 'a', 'blockquote', 'span',
]

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'title', 'target', 'rel'],
  span: ['class'],
}

export function sanitize(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ['https', 'http', 'mailto'],
  })
}
