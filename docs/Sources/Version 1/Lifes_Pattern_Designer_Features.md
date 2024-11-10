# Lifes Pattern Designer Features

This document outlines the key features of the "Lifes" Pattern Designer, an innovative tool designed to streamline the creation of patterns for Conway's Game of Life.

## 1. Pattern Editor
- A canvas where users can create and edit patterns interactively.
- **Cell Interaction:**
  - Users can click on cells to toggle their active state (active cells become inactive and vice versa).
  - When the mouse button is down, dragging will disable cells (if already active) and enable inactive cells. This allows for fluid and intuitive pattern creation.

## 2. Basic UI Controls
- Essential controls for user convenience:
  - **Clear Pattern:** Resets the canvas, allowing users to start fresh.
  - **Undo:** Reverts the last action, enabling users to correct mistakes.
  - **Redo:** Restores an action that was undone.

## 3. Dark Theme
- The application will incorporate a dark theme using Bootstrap, providing a modern and visually appealing interface that enhances user experience, especially during extended use.

## 4. Library of Lifes
- A comprehensive repository of different types of patterns:
  - **Common Lifes:** Frequently used patterns that serve as building blocks.
  - **Famous Lifes:** Notable patterns recognized in the Game of Life community.
  - **Useful Lifes:** Specific oscillators and other patterns that serve practical purposes.
  
## 5. Temporary Pattern Storage (via Cookies)
- **Temporary Storage:** Patterns can be temporarily stored using browser cookies or similar mechanisms. This feature allows users to preserve their current work session without manually saving the pattern. Stored patterns will persist across browser sessions as long as cookies are enabled.
- **Accessing Stored Patterns:** Users can revisit their stored patterns and load them back into the canvas for further editing, ensuring smooth continuity between sessions.

## 6. Pattern Drag and Combination
- **Drag and Drop:** Users can drag patterns from the library or canvas, and drop them onto the editing area.
- **Pattern Combination:** Patterns can be combined by dragging multiple patterns onto the same canvas, allowing for creative experimentation. Overlapping or neighboring cells will merge seamlessly into one unified pattern.
- **Alignment Assistance:** Guidelines or a snapping feature may be introduced to help align patterns during combination.

## 7. Importing Patterns
- The application supports importing patterns in formats compatible with the Game of Life:
  - **RLE (Run Length Encoded)**
  - **Life 1.06 Format**
  - Users can import patterns via file uploads or by copying and pasting the raw text into a dedicated text field.
  - Imported patterns will be displayed directly on the canvas, ready for editing or further combination with existing patterns.

## 8. Undo/Redo Functionality
- Enhanced undo/redo functionality will ensure users can easily manage their editing history without confusion or frustration.

## 9. Interactive Tutorial Section
- A guided tutorial section that introduces users to various types of lifes.
- The tutorials will not simply instruct users on what to do; instead, they will encourage exploration and understanding of how and why certain patterns work, particularly focusing on common oscillators and standard still lifes.

## 10. Advanced Tutorial Section
- An in-depth tutorial section designed for users interested in learning about more complex patterns. This area will provide detailed explanations and interactive components to foster a deeper understanding of advanced techniques.

## 11. Output Formats
- The application will support multiple output formats for saving created lifes:
  - **RLE (Run Length Encoded)**
  - **Life 1.06 Format**
- After selecting a format, users can choose to download the file or copy the text for manual importing into [ConwayLife.com](https://conwaylife.com/). Users will receive a warning if the output exceeds a certain character limit.

## 12. Export/Import Integration
- Imported patterns will behave just like manually created ones:
  - Patterns can be imported in RLE and Life 1.06 formats, edited, and then exported in either format.
- Users can choose to import multiple patterns and combine them on the same canvas.