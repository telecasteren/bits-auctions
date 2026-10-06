## General

**REFACTOR API STRUCTURE**
The same structure appears in all these files:

| File          | Function             |
| ------------- | -------------------- |
| auth/login    | login()              |
| auth/register | register()           |
| profile       | fetchSingleProfile() |
| profile       | fetchBidsByProfile() |
| listings      | fetchAllListings()   |
| listings      | fetchSingleListing() |
| bids          | placeBid()           |

These files above all repeat the same things:

- Repeated fetch pattern
- Repeated error handling
- Repeated JSON parsing pattern

So I was basically trying to say that, you are repeating response handling, error handling, and JSON parsing logic in every API function instead of creating a reusable helper.
