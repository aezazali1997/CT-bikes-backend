---
name: Bug report
about: Create a report to help us improve
title: "[\U0001F41B ANANINJA-bug]"
labels: bug
assignees: ''

---

# @format

name: 🐛 Bug Report
description: File a bug report
title: '🐛 '
labels: ['bug']
projects: ['ananinja/2']
body:
  - type: markdown
    attributes:
      value: |
        ## Required information
  - type: textarea
    attributes:
      label: Page
      description: Please provide page details of the bug.
  - type: textarea
    attributes:
      label: Describe the issue
      description: Please provide a concise description of what you're experiencing.
    validations:
      required: true

  - type: textarea
    attributes:
      label: Expected behavior
      description: Please provide a concise description of what you expected to happen.
    validations:
      required: true

  - type: textarea
    id: steps-to-reproduce
    attributes:
      label: Steps to reproduce
      description: Provide a detailed list of steps that reproduce the issue.
      placeholder: |
        1.
        2.
        3.
      value: |
        1.
        2.
        3.
    validations:
      required: true

  - type: markdown
    attributes:
      value: |
        ## Additonal information

        Providing as much information as possible greatly helps us with reproducting the issues.

  - type: textarea
    attributes:
      label: Screenshots or Video
      description: If applicable, add screenshots/video to help explain your problem.
