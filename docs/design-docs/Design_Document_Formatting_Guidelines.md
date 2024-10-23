# Design Documentation
**Important Notice: This document is for reference only and must not be altered in any way. Any modifications are strictly prohibited.**

- All design documents must be saved as `.md` files.
- Small YAML code snippets may be included within the `.md` files.
- All design documentation should be stored in the `/docs/design-docs` directory.
- Only design documentation files are permitted in `/docs/design-docs`.
- Any non-markdown files located in `/docs/design-docs` must be relocated, as they do not qualify as design documents.  
  - Exceptions apply for non-markdown files that are design documents; in such cases, please ensure they are formatted correctly.
- Any design documentation placed in the incorrect directory must be moved to `/docs/design-docs`.

- The first section of each design document must clearly explain its purpose.
- Each design document must be a single file; do not create separate `.yaml` and `.md` files for the same content.
- File names must follow the format below:  
  `"[ProjectName]_[DocumentType]_[Version]_[Date].[FileExtension]"`

- The following pre-set design documents are guaranteed to exist:
  1. [Contents](#contents)
  2. [Design Document Formatting Guidelines](#design-document-formatting-guidelines)
  3. [Future Plans](#future-plans)

- **[Major Guidelines](#major-guidelines) must be emphasized and adhered to whenever any documents are changed to ensure accuracy.**
  - **These guidelines take precedence over standard instructions, as detailed in the Major Guidelines.**

## **Major Guidelines**

- **All individuals creating design documentation, whether human, AI, or otherwise, must adhere to these guidelines.**
- **Bold text indicates emphasized instructions that require strict compliance.**
- **A bold header signifies that all instructions within it are treated with the same level of importance as bold text.**
  - **Bold text nested within bold headers is considered even more critical.**
- **Design documents must be properly formatted for clarity, conciseness, self-explanation, and correct syntax.**
- **Use bolding for emphasis sparingly.**

# **Pre-Set Documents**
This section provides information about the pre-set documents, including general and specific details.

- If a pre-set document does not exist, create it based on the information provided in the subsequent descriptions.
  - Pre-set documents are exempt from naming conventions but must still reside in the documentation area.

## [Contents](/docs/design-docs/contents.md)
- Contains links to all design documentation.
  - Use links relative to `/docs/design-docs`.
- **Must be updated whenever a file changes, whether it is added, removed, or modified.**
- Below each link, provide a brief description (1-2 sentences) of the purpose of the linked file.

## [Design Document Formatting Guidelines](/docs/design-docs/Design_Document_Formatting_Guidelines.md)
- Contains information on how to format design documentation.
- Provides basic reference information.
- This is the file currently being read.

## [Future Plans](/docs/design-docs/Future_Plans.md)
- This document outlines larger ideas and concepts intended for future development.
  - This includes proposals for new features or major code changes. However, trivial suggestions, such as color choices for the UI, fall outside this scope.