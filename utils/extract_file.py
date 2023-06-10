from docx import Document




def extract_words(file) -> list:
    doc = Document(file)
    words = []
    for paragraph in doc.paragraphs:
        text:str = paragraph.text.strip()
        if text:
            words.extend(text.split())
    return words