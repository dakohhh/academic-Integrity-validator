


from docx import Document

def extract_words_from_docx(file_path):
    doc = Document(file_path)
    words = []
    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()
        if text:
            words.extend(text.split())
    return words

# Example usage
word_document_path = "ESM 302 ASSIGNMENT.docx"
word_list = extract_words_from_docx(word_document_path)
print(word_list)






