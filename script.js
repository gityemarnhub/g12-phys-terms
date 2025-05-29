// Data structure for core tones and their associated types with emojis
const toneTypes = {
    "Positive": [
        "✨ Optimistic", "😄 Joyful", "🤩 Enthusiastic", "🙏 Hopeful", "👏 Appreciative",
        "👍 Encouraging", "💡 Inspirational", "🤝 Friendly", "☀️ Warm", "😂 Amused",
        "🥳 Excited", "😮 Awe-struck"
    ],
    "Neutral/Objective": [
        "⚖️ Impartial", "✅ Factual", "📏 Unbiased", "ℹ️ Informative", "⚪ Detached",
        "🧘 Calm", "➡️ Straightforward", "🔬 Analytic", "📋 Matter-of-fact"
    ],
    "Negative": [
        "👎 Critical", "😔 Pessimistic", "😡 Angry", "😞 Sad", "😏 Sarcastic",
        "🤦 Ironic", "😤 Frustrated", "👊 Aggressive", "👋 Dismissive", "😟 Worried",
        " 🌑 Somber", "😔 Regretful", "🍋 Bitter", " 🤨 Cynical",
        "👉 Accusatory", " ⚔️ Hostile", "😒 Annoyed"
    ],
    "Formal": [
        "👨‍💼 Professional", " 🙇 Respectful", " 👑 Dignified", "🎓 Academic",
        "📜 Authoritative", "😐 Serious", " 🏛️ Solemn", " 🤝 Polite", "🧍 Stiff"
    ],
    "Informal": [
        "👕 Casual", "😊 Friendly", "😌 Relaxed", "💬 Conversational", " 🗣️ Colloquial",
        "🗣️ Chatty", "🚶 Easygoing"
    ],
    "Persuasive": [
        "🤝 Convincing", "✨ Influential", "🚀 Motivational", "💪 Assertive", " 🗣️ Argumentative",
        "⏰ Urgent", " 🌟 Compelling", "🧑‍🏫 Didactic"
    ],
    "Informative": [
        "🎓 Educational", " 🗺️ Instructive", "🖼️ Descriptive", "❓ Explanatory",
        "🧑‍🏫 Didactic", "🤔 Curious"
    ],
    "Emotional": [
        "🫂 Empathetic", "❤️‍🔥 Passionate", "💔 Vulnerable", "😔 Sympathetic", " ❤️ Compassionate",
        " 📸 Sentimental", " ☔ Melancholy", " 😬 Anxious",
        " 😨 fearful", " ✨ Hopeful", " 🎭 Dramatic"
    ],
    "Humorous": [
        "🧠 Witty", "😏 Sarcastic", " 😈 Playful", " 🙃 Ironic",
        "🤪 Comical", "😁 Joking", "🏜️ Dry", "👽 Absurd", "🧚 Whimsical"
    ]
};

const formatsList = [
    "Essay", "Letter", "Email", "Social Media Post", "Report", "Article",
    "Short Story", "Blog Post", "Memo (Memorandum)", "Note", "Lyrics",
    "Reply Message", "Comment", "Product Review", "Recipe", "Job Application",
    "Poem", "Speech", "Script", "User Manual", "FAQ", "Press Release",
    "Biography", "Travel Itinerary", "Meeting Minutes", "Lesson Plan",
    "Quiz Questions", "Dialogue", "Complaint Letter",
    "Thank You Note",
    "Proposal", "Critique", "Case Study", "White Paper", "Interview Questions",
    "Personal Statement", "Eulogy", "Slogan/Tagline", "Headline", "Synopsis",
    "Abstract", "Executive Summary", "Character Sketch", "Worldbuilding Lore",
    "Game Description", "Marketing Email", "Sales Pitch", "Customer Service Response",
    "Internal Communication", "Press Kit", "Advertisement Copy"
];

const knowledgeLevels = [
    "Children (6-12)", "Teenagers (13-18)", "Young Adults (19-30)",
    "Adults (30-60)", "Seniors (60+)", "General Audience"
];

// Get elements
const topicInput = document.getElementById('topicInput');
const formatSelect = document.getElementById('format');
const coreToneSelect = document.getElementById('coreTone');
const articleTypeSelect = document.getElementById('articleType');
const wordsInput = document.getElementById('words');
const languageSelect = document.getElementById('language');
const hashtagsCheckbox = document.getElementById('hashtags');
const emojiCheckbox = document.getElementById('emoji');
const knowledgeLevelSelect = document.getElementById('knowledgeLevel');
const englishTermsCheckbox = document.getElementById('englishTerms');
const additionalPromptTextarea = document.getElementById('additional-prompt');

const mainGenerateBtn = document.getElementById('mainGenerateBtn');
const surpriseMeBtn = document.getElementById('surpriseMeBtn');
const copyArticleBtn = document.getElementById('copyArticleBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const regenerateArticleBtn = document.getElementById('regenerateArticleBtn');
const viewArticleBtn = document.getElementById('viewArticleBtn');
const viewSavedNotesBtn = document.getElementById('viewSavedNotesBtn');

const articleContent = document.getElementById('articleContent');
const articleLoadingOverlay = document.getElementById('articleLoadingOverlay');
const improvedArticleTitle = document.getElementById('improvedArticleTitle');
const regenerateTitleBtn = document.getElementById('regenerateTitleBtn');

// Modal elements
const articleModal = document.getElementById('articleModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalArticleTitle = document.getElementById('modalArticleTitle');
const modalArticleText = document.getElementById('modalArticleText');
const decreaseFontSizeBtn = document.getElementById('decreaseFontSize');
const increaseFontSizeBtn = document.getElementById('increaseFontSize');

// Word meaning popup elements
const wordMeaningPopup = document.getElementById('wordMeaningPopup');

// Saved Notes Modal elements
const savedNotesModal = document.getElementById('savedNotesModal');
const savedNotesCloseBtn = document.getElementById('savedNotesCloseBtn');
const savedNotesList = document.getElementById('savedNotesList');

// View Single Note Modal elements
const viewNoteModal = document.getElementById('viewNoteModal');
const viewNoteCloseBtn = document.getElementById('viewNoteCloseBtn');
const viewNoteTitle = document.getElementById('viewNoteTitle');
const viewNoteText = document.getElementById('viewNoteText');
const viewNoteDecreaseFontSize = document.getElementById('viewNoteDecreaseFontSize');
const viewNoteIncreaseFontSize = document.getElementById('viewNoteIncreaseFontSize');


// Initial font size for the modal article text
let currentFontSize = parseFloat(window.getComputedStyle(modalArticleText).fontSize);
let viewNoteCurrentFontSize = parseFloat(window.getComputedStyle(viewNoteText).fontSize);
const fontSizeStep = 2; // Pixels to increase/decrease by

// Functions for dynamic dropdown
function populateArticleTypes(coreTone) {
    const types = toneTypes[coreTone] || [];
    articleTypeSelect.innerHTML = ''; // Clear current options
    types.forEach(type => {
        const option = document.createElement('option');
        // Use a regular regular expression to remove the emoji and any leading space from the value
        option.value = type.replace(/^\p{Emoji}\s*/u, '');
        option.textContent = type; // Keep emoji for display
        articleTypeSelect.appendChild(option);
    });
    // Select the first option by default
    if (types.length > 0) {
        articleTypeSelect.value = types[0].replace(/^\p{Emoji}\s*/u, '');
    }
}

// Initialize types based on the default core tone
populateArticleTypes(coreToneSelect.value);

// Event listener for coreTone change
coreToneSelect.addEventListener('change', (event) => {
    populateArticleTypes(event.target.value);
});

// Function to get the API key (always return empty string for Canvas to inject)
function getApiKey() {
    return "";
}

// Function to show loading animation on a button
function showButtonLoading(buttonId) {
    const button = document.getElementById(buttonId);
    const textSpan = button.querySelector('span:not(.button-spinner)');
    const spinnerSpan = button.querySelector('.button-spinner');
    if (textSpan) textSpan.classList.add('hidden');
    if (spinnerSpan) spinnerSpan.classList.remove('hidden');
    button.disabled = true;
}

// Function to hide loading animation on a button
function hideButtonLoading(buttonId) {
    const button = document.getElementById(buttonId);
    const textSpan = button.querySelector('span:not(.button-spinner)');
    const spinnerSpan = button.querySelector('.button-spinner');
    if (textSpan) textSpan.classList.remove('hidden');
    if (spinnerSpan) spinnerSpan.classList.add('hidden');
    button.disabled = false;
}

/**
 * Converts a subset of Markdown to HTML.
 * Handles: Headings (#, ##, etc.), Bold (**text**, __text__), Italics (*text*, _text_),
 * Unordered Lists (*, -), Ordered Lists (1.), Paragraphs, and Line Breaks.
 * @param {string} markdown - The markdown string to convert.
 * @returns {string} The HTML string.
 */
function markdownToHtml(markdown) {
    let html = markdown;

    // 1. Escape HTML characters first to prevent XSS and ensure markdown characters are processed
    html = html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Split into lines for block-level processing
    const lines = html.split('\n');
    let processedLines = [];
    let inList = false;
    let listType = ''; // 'ul' or 'ol'

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const trimmedLine = line.trim();

        // Check for block-level elements (Headings, Lists)
        const h6Match = trimmedLine.match(/^###### (.*)/);
        const h5Match = trimmedLine.match(/^##### (.*)/);
        const h4Match = trimmedLine.match(/^#### (.*)/);
        const h3Match = trimmedLine.match(/^### (.*)/);
        const h2Match = trimmedLine.match(/^## (.*)/);
        const h1Match = trimmedLine.match(/^# (.*)/);

        const ulMatch = trimmedLine.match(/^[*-] (.*)/);
        const olMatch = trimmedLine.match(/^(\d+\.) (.*)/);

        if (h1Match) {
            if (inList) { processedLines.push(`</${listType}>`); inList = false; }
            processedLines.push(`<h1>${h1Match[1]}</h1>`);
        } else if (h2Match) {
            if (inList) { processedLines.push(`</${listType}>`); inList = false; }
            processedLines.push(`<h2>${h2Match[1]}</h2>`);
        } else if (h3Match) {
            if (inList) { processedLines.push(`</${listType}>`); inList = false; }
            processedLines.push(`<h3>${h3Match[1]}</h3>`);
        } else if (h4Match) {
            if (inList) { processedLines.push(`</${listType}>`); inList = false; }
            processedLines.push(`<h4>${h4Match[1]}</h4>`);
        } else if (h5Match) {
            if (inList) { processedLines.push(`</${listType}>`); inList = false; }
            processedLines.push(`<h5>${h5Match[1]}</h5>`);
        } else if (h6Match) {
            if (inList) { processedLines.push(`</${listType}>`); inList = false; }
            processedLines.push(`<h6>${h6Match[1]}</h6>`);
        } else if (ulMatch) {
            if (!inList || listType !== 'ul') {
                if (inList) processedLines.push(`</${listType}>`);
                processedLines.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            processedLines.push(`<li>${ulMatch[1]}</li>`);
        } else if (olMatch) {
            if (!inList || listType !== 'ol') {
                if (inList) processedLines.push(`</${listType}>`);
                processedLines.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            processedLines.push(`<li>${olMatch[2]}</li>`);
        } else {
            // End current list if any
            if (inList) {
                processedLines.push(`</${listType}>`);
                inList = false;
            }
            // Add the line as is for now; paragraph handling comes next
            processedLines.push(line);
        }
    }

    // Close any open list at the end of the document
    if (inList) {
        processedLines.push(`</${listType}>`);
    }

    // Join lines back to process paragraphs and inline elements
    html = processedLines.join('\n');

    // Inline elements: Bold and Italics (apply after block-level structure)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // **bold**
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');     // __bold__
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');           // *italic*
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');             // _italic_

    // Paragraphs and Line Breaks:
    // Split by double newlines to identify distinct paragraphs.
    // Then process each paragraph for single newlines.
    const paragraphBlocks = html.split(/\n\n+/); // Split by one or more blank lines
    let finalHtmlBlocks = [];

    for (let block of paragraphBlocks) {
        if (block.trim() === '') continue; // Skip empty blocks

        // Check if the block already starts with a known HTML block tag (h1-h6, ul, ol, li)
        // This prevents wrapping already formatted block elements in <p> tags.
        if (block.match(/^\s*<\/?(h[1-6]|ul|ol|li|strong|em)>/i)) {
            finalHtmlBlocks.push(block);
        } else {
            // Replace single newlines within the paragraph block with <br>
            const pContent = block.replace(/\n/g, '<br>');
            finalHtmlBlocks.push(`<p>${pContent}</p>`);
        }
    }

    html = finalHtmlBlocks.join('\n');

    // Remove any empty paragraph tags that might have been created by mistake
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><br><\/p>/g, '');

    return html;
}

// Function to generate improved article title using Gemini API
async function generateImprovedTitle() {
    const topic = topicInput.value;
    const format = formatSelect.value;
    const coreTone = coreToneSelect.value;
    const articleType = articleTypeSelect.value;
    const selectedModel = 'gemini-2.0-flash';
    const apiKey = getApiKey();

    if (!topic) {
        improvedArticleTitle.textContent = 'Enter a topic to generate title.';
        return;
    }

    let prompt = `Generate a concise and engaging title for a ${format} about "${topic}". The core tone should be ${coreTone}. The writing style should be ${articleType}. Respond with only the title words, no extra text or punctuation.`;
    improvedArticleTitle.textContent = 'Generating title...';
    showButtonLoading('regenerateTitleBtn');

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const titleText = result.candidates[0].content.parts[0].text.trim();
            improvedArticleTitle.textContent = titleText;
        } else {
            improvedArticleTitle.textContent = 'Failed to generate title.';
            console.error('Gemini API response error for title:', result);
        }
    } catch (error) {
        improvedArticleTitle.textContent = 'Error generating title.';
        console.error('Error calling Gemini API for title:', error);
    } finally {
        hideButtonLoading('regenerateTitleBtn');
    }
}

// Function to generate article content using Gemini API
async function generateArticle() {
    const topic = topicInput.value;
    const format = formatSelect.value;
    const coreTone = coreToneSelect.value;
    const articleType = articleTypeSelect.value;
    const words = wordsInput.value;
    const language = languageSelect.value;
    const hashtags = hashtagsCheckbox.checked;
    const emoji = emojiCheckbox.checked;
    const knowledgeLevel = knowledgeLevelSelect.value;
    const englishTerms = englishTermsCheckbox.checked;
    const additionalPrompt = additionalPromptTextarea.value.trim();

    const selectedModel = 'gemini-2.0-flash';
    const apiKey = getApiKey();

    let prompt = `Generate a ${format} about "${topic || 'a general topic'}" in ${language} language.`;
    prompt += ` The core tone should be ${coreTone}. The writing style should be ${articleType}. Aim for approximately ${words} words.`;
    prompt += ` Use Markdown for formatting (e.g., **bold**, *italics*, # headings, - lists).`; // Explicitly request Markdown

    if (knowledgeLevel === 'Children (6-12)') {
        prompt += ` The content should be very easy to understand, using simple vocabulary and explanations, and focusing on ground-level information.`;
    } else if (knowledgeLevel === 'Teenagers (13-18)') {
        prompt += ` The content should be engaging and accessible for teenagers, providing clear explanations without being overly simplistic or overly academic.`;
    } else if (knowledgeLevel === 'Young Adults (19-30)') {
        prompt += ` The content should be informative and engaging for young adults, assuming a moderate level of general knowledge and providing a good balance of detail.`;
    } else if (knowledgeLevel === 'Adults (30-60)') {
        prompt += ` The content should be comprehensive and insightful for adults, assuming a foundational understanding of basic concepts and delving into more nuanced details.`;
    } else if (knowledgeLevel === 'Seniors (60+)') {
        prompt += ` The content should be clear, concise, and respectful, avoiding overly complex jargon and focusing on practical or relevant aspects for seniors.`;
    } else if (knowledgeLevel === 'General Audience') {
        prompt += ` The content should be broadly accessible and informative for a general audience, providing enough detail to be interesting without requiring specialized prior knowledge.`;
    }

    if (englishTerms) {
        prompt += ` All technical terms should be in English, regardless of the article's main language.`;
    }

    if (hashtags) {
        prompt += ` Include relevant hashtags.`;
    }
    if (emoji) {
        prompt += ` Include relevant emojis.`;
    }

    if (additionalPrompt) {
        prompt += ` Additional instructions: ${additionalPrompt}.`;
    }

    articleContent.value = ''; // Clear content before generating
    articleLoadingOverlay.classList.add('show'); // Show loading overlay
    showButtonLoading('regenerateArticleBtn'); // Show loading on regenerate article button

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            // Add 10 blank lines for extra scrolling
            articleContent.value = text + '\n\n\n\n\n\n\n\n\n\n';
        } else {
            articleContent.value = 'Failed to generate article. Please try again.';
            console.error('Gemini API response error:', result);
        }
    } catch (error) {
        articleContent.value = 'Error generating article. Please check your network connection or try again later.';
        console.error('Error calling Gemini API:', error);
    } finally {
        articleLoadingOverlay.classList.remove('show'); // Hide loading overlay
        hideButtonLoading('regenerateArticleBtn'); // Hide loading on regenerate article button
    }
}

// Function to show toast messages
function showMessage(message, type = 'info') {
    const container = document.getElementById('messageContainer');
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box', type);
    messageBox.textContent = message;
    container.appendChild(messageBox);

    // Trigger reflow to enable transition
    void messageBox.offsetWidth;
    messageBox.classList.add('show');

    setTimeout(() => {
        messageBox.classList.remove('show');
        messageBox.addEventListener('transitionend', () => {
            messageBox.remove();
        }, { once: true });
    }, 3000); // Message disappears after 3 seconds
}

// Add event listeners
if (mainGenerateBtn) {
    mainGenerateBtn.addEventListener('click', async () => {
        showButtonLoading('mainGenerateBtn'); // Show loading on main generate button
        try {
            await generateImprovedTitle(); // Generate title first
            await generateArticle();
        } finally {
            hideButtonLoading('mainGenerateBtn'); // Hide loading on main generate button
        }
    });
}

// Surprise Me! button event listener
if (surpriseMeBtn) {
    surpriseMeBtn.addEventListener('click', async () => {
        const currentFormat = formatSelect.value;
        const currentCoreTone = coreToneSelect.value;
        const currentArticleType = articleTypeSelect.value;
        const currentLanguage = languageSelect.value;
        const currentKnowledgeLevel = knowledgeLevelSelect.value;

        let prompt = `Generate a random topic for a ${currentFormat} with a ${currentCoreTone} core tone and ${currentArticleType} style, in ${currentLanguage} language, suitable for a ${currentKnowledgeLevel} audience. Respond with only the topic words, no extra text or punctuation.`;
        const selectedModel = 'gemini-2.0-flash'; // Default model
        const apiKey = getApiKey();

        showButtonLoading('surpriseMeBtn'); // Show loading on surprise button

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const generatedTopic = result.candidates[0].content.parts[0].text.trim();
                topicInput.value = generatedTopic;
            } else {
                console.error('Gemini API response error for surprise topic:', result);
                showMessage('Failed to generate a surprise topic. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            showMessage('Error generating surprise topic. Please check your network.', 'error');
        } finally {
            hideButtonLoading('surpriseMeBtn'); // Hide loading on surprise button
        }
    });
}

if (copyArticleBtn) {
    copyArticleBtn.addEventListener('click', () => {
        articleContent.select();
        articleContent.setSelectionRange(0, 99999); // For mobile devices

        try {
            document.execCommand('copy');
            showMessage('Article copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy article content.', err);
            showMessage('Failed to copy article. Please try manually.', 'error');
        }
    });
}

if (regenerateArticleBtn) {
    regenerateArticleBtn.addEventListener('click', generateArticle);
}

if (regenerateTitleBtn) {
    regenerateTitleBtn.addEventListener('click', generateImprovedTitle);
}

// Function to open the modal for viewing article content
function openArticleModal() {
    const rawContent = articleContent.value.trim();
    if (rawContent === '') {
        showMessage('Generate an article first to view it.', 'info');
        return;
    }
    modalArticleTitle.textContent = improvedArticleTitle.textContent;

    // Always render HTML using markdownToHtml
    modalArticleText.innerHTML = markdownToHtml(rawContent);

    articleModal.classList.add('show');
    modalArticleText.style.fontSize = '1.125rem'; // Reset font size for consistency
    currentFontSize = parseFloat(window.getComputedStyle(modalArticleText).fontSize);
}

// Event listener for the "View Article" button (renamed from Read Article)
const viewArticleBtn = document.getElementById('viewArticleBtn');
if (viewArticleBtn) {
    viewArticleBtn.addEventListener('click', openArticleModal);
}

// Event listener for the modal close button
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        articleModal.classList.remove('show');
        hideWordMeaningPopup(); // Hide popup when modal closes
    });
}

// Font size adjustment functions
if (decreaseFontSizeBtn) {
    decreaseFontSizeBtn.addEventListener('click', () => {
        currentFontSize = Math.max(12, currentFontSize - fontSizeStep); // Minimum font size 12px
        modalArticleText.style.fontSize = `${currentFontSize}px`;
    });
}

if (increaseFontSizeBtn) {
    increaseFontSizeBtn.addEventListener('click', () => {
        currentFontSize = Math.min(40, currentFontSize + fontSizeStep); // Maximum font size 40px
        modalArticleText.style.fontSize = `${currentFontSize}px`;
    });
}

// Word Meaning Pop-up Logic
let meaningFetchController = null; // To abort previous fetch requests

function hideWordMeaningPopup() {
    wordMeaningPopup.classList.remove('show');
    wordMeaningPopup.textContent = '';
    if (meaningFetchController) {
        meaningFetchController.abort();
        meaningFetchController = null;
    }
}

// Function to get meaning of selected text using Gemini API
async function getWordMeaning(word) {
    const selectedModel = 'gemini-2.0-flash';
    const apiKey = getApiKey();
    // Default prompt for word meaning
    let prompt = `Provide a concise meaning for the word/phrase "${word}" in Burmese language, approximately 20 words.`;

    wordMeaningPopup.textContent = 'Loading meaning...';
    meaningFetchController = new AbortController();
    const signal = meaningFetchController.signal;

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: signal
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const meaningText = result.candidates[0].content.parts[0].text.trim();
            wordMeaningPopup.textContent = meaningText;
        } else {
            wordMeaningPopup.textContent = 'Meaning not found.';
            console.error('Gemini API response error for meaning:', result);
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Meaning fetch aborted.');
        } else {
            wordMeaningPopup.textContent = 'Error fetching meaning.';
            console.error('Error calling Gemini API for meaning:', error);
        }
    } finally {
        meaningFetchController = null;
    }
}

// Event listener for mouseup on modalArticleText to detect selection
if (modalArticleText) {
    modalArticleText.addEventListener('mouseup', (event) => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        // Check if text is selected and it's within the modalArticleText element
        if (selectedText.length > 0 && modalArticleText.contains(selection.anchorNode)) {
            // Basic validation: ensure it's not too long (e.g., a whole paragraph)
            const words = selectedText.split(/\s+/).filter(word => word.length > 0);
            if (words.length > 5) { // Limit to 5 words for a definition
                hideWordMeaningPopup();
                return;
            }

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const modalRect = articleModal.getBoundingClientRect(); // Get modal's position

            // Calculate position relative to the modal
            let popupX = rect.left - modalRect.left + (rect.width / 2);
            let popupY = rect.top - modalRect.top - wordMeaningPopup.offsetHeight - 10; // 10px above selection

            // Adjust for horizontal overflow
            if (popupX + wordMeaningPopup.offsetWidth / 2 > modalRect.width) {
                popupX = modalRect.width - wordMeaningPopup.offsetWidth;
            }
            if (popupX - wordMeaningPopup.offsetWidth / 2 < 0) {
                popupX = 0;
            }

            wordMeaningPopup.style.left = `${popupX}px`;
            wordMeaningPopup.style.top = `${popupY}px`;
            wordMeaningPopup.classList.add('show');

            getWordMeaning(selectedText);
        } else {
            hideWordMeaningPopup();
        }
    });

    // Hide popup if user clicks outside the selection area but within the modal
    articleModal.addEventListener('click', (event) => {
        if (!wordMeaningPopup.contains(event.target) && !modalArticleText.contains(event.target)) {
            hideWordMeaningPopup();
        }
    });
}

// Saved Notes Functionality
function getSavedNotes() {
    const notes = localStorage.getItem('savedNotes');
    return notes ? JSON.parse(notes) : [];
}

function saveNotesToLocalStorage(notes) {
    localStorage.setItem('savedNotes', JSON.stringify(notes));
}

function saveCurrentNote() {
    const title = improvedArticleTitle.textContent.trim();
    const content = articleContent.value.trim(); // Save raw markdown content

    if (!title || title === 'Article Title' || !content) {
        showMessage('Please generate an article and title first to save it.', 'info');
        return;
    }

    const notes = getSavedNotes();
    const newNote = {
        id: Date.now(), // Unique ID for the note
        title: title,
        content: content, // Save the raw markdown content
        savedAt: new Date().toLocaleString()
    };
    notes.unshift(newNote); // Add to the beginning
    saveNotesToLocalStorage(notes);
    showMessage('Article saved to notes!', 'success');
}

function deleteNote(id) {
    let notes = getSavedNotes();
    notes = notes.filter(note => note.id !== id);
    saveNotesToLocalStorage(notes);
    renderSavedNotes(); // Re-render the list after deletion
    showMessage('Note deleted.', 'info');
}

function renderSavedNotes() {
    const notes = getSavedNotes();
    savedNotesList.innerHTML = ''; // Clear current list

    if (notes.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No notes saved yet.';
        li.classList.add('justify-center', 'text-gray-400', 'py-4');
        savedNotesList.appendChild(li);
        return;
    }

    notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${note.title} <br> <span class="text-xs text-gray-400">${note.savedAt}</span></span>
            <div>
                <button data-id="${note.id}" class="view-note-btn">View</button>
                <button data-id="${note.id}" class="delete-btn">Delete</button>
            </div>
        `;
        savedNotesList.appendChild(li);
    });

    // Add event listeners for view and delete buttons on newly rendered notes
    savedNotesList.querySelectorAll('.view-note-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const noteId = parseInt(event.target.dataset.id);
            const noteToView = notes.find(note => note.id === noteId);
            if (noteToView) {
                displaySingleNote(noteToView);
            }
        });
    });

    savedNotesList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const noteId = parseInt(event.target.dataset.id);
            deleteNote(noteId);
        });
    });
}

function displaySingleNote(note) {
    viewNoteTitle.textContent = note.title;

    // Always render HTML using markdownToHtml for view note modal
    viewNoteText.innerHTML = markdownToHtml(note.content);

    viewNoteModal.classList.add('show');
    viewNoteText.style.fontSize = '1.125rem'; // Reset font size for consistency
    viewNoteCurrentFontSize = parseFloat(window.getComputedStyle(viewNoteText).fontSize);
}

// Event Listeners for new buttons
if (saveNoteBtn) {
    saveNoteBtn.addEventListener('click', saveCurrentNote);
}

if (viewSavedNotesBtn) {
    viewSavedNotesBtn.addEventListener('click', () => {
        renderSavedNotes();
        savedNotesModal.classList.add('show');
    });
}

if (savedNotesCloseBtn) {
    savedNotesCloseBtn.addEventListener('click', () => {
        savedNotesModal.classList.remove('show');
    });
}

if (viewNoteCloseBtn) {
    viewNoteCloseBtn.addEventListener('click', () => {
        viewNoteModal.classList.remove('show');
    });
}

// Font size adjustment for View Note Modal
if (viewNoteDecreaseFontSize) {
    viewNoteDecreaseFontSize.addEventListener('click', () => {
        viewNoteCurrentFontSize = Math.max(12, viewNoteCurrentFontSize - fontSizeStep);
        viewNoteText.style.fontSize = `${viewNoteCurrentFontSize}px`;
    });
}

if (viewNoteIncreaseFontSize) {
    viewNoteIncreaseFontSize.addEventListener('click', () => {
        viewNoteCurrentFontSize = Math.min(40, viewNoteCurrentFontSize + fontSizeStep);
        viewNoteText.style.fontSize = `${viewNoteCurrentFontSize}px`;
    });
}

// Populate format dropdown on load
document.addEventListener('DOMContentLoaded', () => {
    const formatSelectElement = document.getElementById('format');
    formatSelectElement.innerHTML = ''; // Clear existing options
    formatsList.forEach(format => {
        const option = document.createElement('option');
        option.value = format;
        option.textContent = format;
        formatSelectElement.appendChild(option);
    });
    // Set default selected option if needed
    formatSelectElement.value = "Essay";
});
