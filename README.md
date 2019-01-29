# VSCCodeReview
A simple Visual Studio Code plugin.

## Description

A simple plugin for Code Reviews, functions solely as an aide memoire to remind me what sections of open files I have read by coloring the scrollbar pink/purple.
If you mark a section of a file as read the plugin in will remember that selection against the file path for later.  Opening a file for review is not necessary before marking or resetting, but does function to restore any previous state.  

## Usage

- Use the context menu to open a file for code review, this loads any saved state.
- Or use the context menu to mark a selection as read, this will color the scroll bar to indicate you've read those lines of code. Marked lines are saved to state.
- Reset file removes all marks, so you can start again.

## Keybindings

None are defined by default, you can set them using Preferences->Keyboard Shortcuts.

I use:

- apple-alt-shift-R to open for review.
- apple-shift-R to read 
- leave reset unbound to a shortcut

This hovers close to some default keybindings in VSC but I find it OK.
