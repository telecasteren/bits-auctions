## General

> TODO: Improve CSS imports, fonts and Tailwind principles

> DONE: created a reusable helper

**REFACTOR API STRUCTURE**

These files all repeat the same things:

- Repeated fetch pattern
- Repeated error handling
- Repeated JSON parsing pattern

| File          | Function             |
| ------------- | -------------------- |
| auth/login    | login()              |
| auth/register | register()           |
| profile       | fetchSingleProfile() |
| profile       | fetchBidsByProfile() |
| listings      | fetchAllListings()   |
| listings      | fetchSingleListing() |
| bids          | placeBid()           |
