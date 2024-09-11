## Scenario

You have just been told that you are going to be in charge of an old project. The codebase was developed by a 3rd party and has been running in production for more than a year. The 3rd party is no longer contactable and the codebase has been handed over to you to make an assessment on the project. As well as get it ready for a new important client. 

The project presents state warnings from the Bureau Of Meteorology as a json api. It has two endpoints list warnings and warning detail. The client project hasn't been scoped yet. We do not know what their specific requirements will be. We do know however that this client will dramatically increase the current traffic load on the API, somewhere in the order of 1000x. 

You have some time to make changes to this codebase before the project kicks off. 

> **Note:** This isn't a test about figuring out the BOM standards. You don't need to look up and become an expert on the Bureau Of Meteorology AMOC standard. You can assume that the field mappings are correct, but how the data is being parsed is fair game.

## Your tasks

1. Get the project running, inspect the codebase, and note down any issues you see.
2. Determine the 5 most critical parts of the project that need changing based on the scenario above. For each one, consider the changes that you would make to improve the codebase.
3. Consider the application's architecture and production run time and think about what changes would you make (if any) to accommodate the new requirements.

> **Note:** We will be discussing the issues you have found during the interview, so please make sure you note them down and that you are familiar with the codebase.
> You don't necessarily need to fix or rewrite everything though it is encouraged to make some changes that you can show off during the interview to help with the discussion.

## What we're looking for

1. Your ability to read and understand an unfamiliar codebase
1. Your ability to identify issues with an unfamiliar codebase
1. Your ability to communicate those issues, why they're an issue, and what work needs to be done to resolve the issue
