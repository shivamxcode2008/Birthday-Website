# Content Structure & Architecture

## Overview
All personal content must be decoupled from the UI logic. The developer should not need to hunt through complex HTML/React components to change a friend's name, swap a photo, or rewrite a heartfelt message. 

We will create a centralized `content.js` or `data.json` file that acts as the single source of truth for the personalization.

## Data Schema

### 1. Global Variables
```javascript
{
  "friendName": "[FRIEND_NAME]",
  "birthdayDate": "YYYY-MM-DD",
  "metaTitle": "A special day for [FRIEND_NAME]",
  "metaDescription": "I made something for you..."
}
```

### 2. The Opening & Greeting
```javascript
{
  "envelopeText": "I made something for you...",
  "greetingHeadline": "Happy Birthday, [FRIEND_NAME]",
  "greetingSubtitle": "Let's celebrate you today."
}
```

### 3. Digital Gifts
An array of objects to allow for dynamic rendering of any number of gifts.
```javascript
"gifts": [
  {
    "id": "gift_1",
    "type": "text", // e.g., text, image, joke
    "title": "A little truth",
    "content": "[GIFT_MESSAGE_1]"
  },
  {
    "id": "gift_2",
    "type": "joke",
    "title": "Remember when...",
    "content": "[INSIDE_JOKE_1]"
  }
]
```

### 4. Memories (Scrapbook)
```javascript
"memories": [
  {
    "id": "mem_1",
    "imagePath": "/assets/images/placeholder_1.jpg",
    "dateLabel": "[DATE_OR_SEASON]",
    "caption": "[MEMORY_CAPTION_1]"
  },
  {
    "id": "mem_2",
    "imagePath": "/assets/images/placeholder_2.jpg",
    "dateLabel": "[DATE_OR_SEASON]",
    "caption": "[MEMORY_CAPTION_2]"
  }
]
```

### 5. The Personal Letter
To handle formatting (paragraphs, line breaks), the letter can be an array of strings, where each string is a paragraph.
```javascript
{
  "letterGreeting": "Dear [FRIEND_NAME],",
  "letterBody": [
    "[PARAGRAPH_1]",
    "[PARAGRAPH_2]",
    "[PARAGRAPH_3]"
  ],
  "letterSignoff": "Love always,",
  "letterSignature": "[YOUR_NAME]"
}
```

### 6. The Finale
```javascript
{
  "candleInstruction": "Make a wish... then tap the flame.",
  "finalHeadline": "Happy Birthday.",
  "finalSubtext": "[FINAL_MESSAGE]"
}
```

## Asset Organization
Assets should be stored cleanly in a public folder, referenced by the data structure above.
```text
/public
  /assets
    /images
      - memory_1.jpg
      - memory_2.jpg
    /icons
      - gift_closed.svg
      - gift_opened.svg
      - envelope.svg
```

By strictly following this architecture, final content can be dropped in at the very end of the project without breaking any styling or animations.
