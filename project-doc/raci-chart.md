# Creating and Analyzing a RACI Chart

## Project Overview

This file uses the StudyWave project as the example for a RACI chart. The main purpose here is to show how roles, responsibilities, and task ownership were organized during the project.

The full project overview is already covered in the main README.

## Main Objective

Set clear ownership for StudyWave work so each deliverable has one accountable role, clear execution ownership, and better communication with stakeholders like project reviewers and student users.

## Roles and Team Members

This is a solo project in practice, so one person covers multiple roles.

| Role               | Assigned Team Member | Responsibility                                                          |
| ------------------ | -------------------- | ----------------------------------------------------------------------- |
| Product Owner      | Kokob Haile          | Defines goals, scope, and priorities for StudyWave features.            |
| Project Manager    | Kokob Haile          | Plans timeline, tracks milestones, and keeps delivery on schedule.      |
| UI/UX Designer     | Kokob Haile          | Designs layouts, visual consistency, and responsive behavior.           |
| Frontend Developer | Kokob Haile          | Implements all app features in HTML, CSS, and JavaScript.               |
| QA and Reviewer    | Kokob Haile          | Runs testing, validates quality, and finalizes documentation/readiness. |

## Main Tasks and Deliverables

1. Confirm project scope, in-scope and out-of-scope items
2. Finalize UI structure and design tokens from the approved design direction
3. Build navigation and multi-view app structure (Dashboard, All Sessions, Stats)
4. Implement Add Session flow (topic, date, duration, notes) with validation
5. Implement Dashboard cards, greeting, and recent sessions rendering
6. Implement All Sessions list, topic filters, and delete flow
7. Implement Stats page cards and topic-hours chart
8. Run manual QA on desktop/mobile and fix priority bugs
9. Complete final documentation package (README, kickoff, technical docs)
10. Prepare final submission package and walkthrough/presentation

## Initial RACI Chart

R = Responsible, A = Accountable, C = Consulted, I = Informed

| Task / Deliverable                     | Product Owner | Project Manager | UI/UX Designer | Frontend Developer | QA and Reviewer |
| -------------------------------------- | ------------- | --------------- | -------------- | ------------------ | --------------- |
| 1. Scope and boundaries                | A             | R               | C              | I                  | I               |
| 2. UI structure and design tokens      | C             | A               | R              | C                  | I               |
| 3. Navigation and multi-view structure | I             | A               | C              | R                  | C               |
| 4. Add Session flow                    | I             | A               | C              | R                  | C               |
| 5. Dashboard and recent sessions       | C             | A               | C              | R                  | I               |
| 6. All Sessions, filters, delete       | I             | A               | C              | R                  | C               |
| 7. Stats cards and chart               | C             | A               | C              | R                  | I               |
| 8. QA testing and bug fixes            | I             | A               | I              | R                  | R               |
| 9. Final documentation package         | C             | A               | I              | C                  | R               |
| 10. Final submission and presentation  | A             | R               | I              | C                  | C               |

## Analysis of the Initial Chart

### 1) Gaps

- QA is brought in too late on feature work, so issues can pile up near the end.

### 2) Overlaps

- Project Manager is accountable for too many tasks, which makes ownership too concentrated.

### 3) Balance

- Every task has ownership, but accountability is not spread evenly across roles.

### 4) Consultation Pattern

- Consultation is decent overall, but Product Owner input is inconsistent on some user-facing tasks.

### 5) Communication Pattern

- "Informed" is used, but update timing is unclear, especially before QA sign-off and submission.

## Improvements Made After Analysis

1. Moved design ownership to UI/UX Designer and feature ownership to Frontend Developer where it fits best.
2. Pulled QA and Reviewer into earlier consultation so testing feedback comes sooner.
3. Reduced Project Manager overload while keeping one accountable role per task.

## Final Revised RACI Chart

R = Responsible, A = Accountable, C = Consulted, I = Informed

| Task / Deliverable                     | Product Owner | Project Manager | UI/UX Designer | Frontend Developer | QA and Reviewer |
| -------------------------------------- | ------------- | --------------- | -------------- | ------------------ | --------------- |
| 1. Scope and boundaries                | A             | R               | C              | I                  | C               |
| 2. UI structure and design tokens      | C             | I               | A/R            | C                  | C               |
| 3. Navigation and multi-view structure | C             | C               | C              | A/R                | I               |
| 4. Add Session flow                    | C             | I               | C              | A/R                | C               |
| 5. Dashboard and recent sessions       | A             | I               | C              | R                  | C               |
| 6. All Sessions, filters, delete       | A             | I               | C              | R                  | C               |
| 7. Stats cards and chart               | A             | I               | C              | R                  | C               |
| 8. QA testing and bug fixes            | C             | C               | I              | R                  | A               |
| 9. Final documentation package         | C             | C               | I              | R                  | A               |
| 10. Final submission and presentation  | A             | R               | I              | C                  | C               |

## How This RACI Chart Would Be Used in Project Documentation

### Option 1: Confluence

1. Create a page named StudyWave - RACI Chart under the project documentation space.
2. Copy this markdown content and paste it into Confluence (or rebuild the tables using the table block).
3. Add links from project kickoff and final submission pages.
4. Set a review reminder before major milestones (for example, before QA and before final submission).

### Option 2: Project Repository Documentation (current setup)

1. Keep this file in project-doc/raci-chart.md.
2. Link to it from key project docs.
3. Update it when major scope or role changes happen.

## Where This RACI Chart Should Be Included or Linked

1. README.md
   Reason: README is the first project entry point. A simple link to the RACI chart helps reviewers quickly understand ownership and the delivery process.

2. project-doc/project-kickoff.md
   Reason: The kickoff document already defines goals, scope, timeline, and roles. Linking the RACI chart there keeps planning and execution ownership connected.

## Final Notes

- Every task in the revised chart has at least one Responsible role.
- Every task has exactly one Accountable role.
- The revised chart is more balanced and still matches the real solo-project setup of StudyWave.
