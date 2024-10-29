# Installation
```
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
npm warn deprecated domexception@2.0.1: Use your platform's native DOMException instead
npm warn deprecated w3c-hr-time@1.0.2: Use your platform's native performance.now() and performance.timeOrigin.

added 456 packages, and audited 457 packages in 4s

47 packages are looking for funding
  run `npm fund` for details

8 vulnerabilities (1 low, 4 moderate, 3 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force
```

# 5 Most Critial
## Dependencies - Security
There are 8 vulnerabilties (3 are high). Note that semver is a high priority item and going up the tree its used by nodemon which would be running on production (not just for building), I'm not sure on the attack vector for this, but its a bad idea to dismiss these even if just for tooling because it leads to human error making judgement calls. Update deps

## ts-node
I don't like the idea of transpiling the code during execution / runtime and having the overhead of running ts-node on box. We should be building static artifacts that are built through impartial CI/CD with a similar execution environment to the server environment. We should then have "pre-compiled" JS code that runs on the server with little else running on top. 

## Dependencies - Memory Leak and other
Even though we aren't using inflight depedency in the code, we shoudl remove it....
I seperated these because I would put them in different baskets. WE can see that inflight reports a memory look and recommends a different project and there are several unsupported projects and recommendations to use the native environment. I would look at upgrading and switching patterns after looking at the each repository / readme and assessing the work needed.

## Caching
Looks like a package was added, but not used (lru-cache has been my goto). Consider that there could be a 1000x spike in usage, I am considering caching on S3.

BOM states that forcasts are updated twice daily (morning and afternoon).

After inspecting the FTP file amoc.xml, I noticed that they are consistently updated every 15 minutes on the 15 minute mark. There were several instances on the 0:46 mark and on the 0:10 mark. This starts tell me the resolution / timelieness of the updates and how I might cache these.

I am thinking that the simplest approach is to place AWS Cloudfront to cache GET requests on a ~5 minute window. I am consiering LRU-Cache and somethign such as Redis


# Running
## *nix vs windows
I did this on a windows box and found that we needed to change the command to `SET NODE_ENV=production & ts-node src/index.ts`. Depends on the organisations policy on environments.

## Logging
No logs. logs.log file is on disc and doesn't appear to have a mechanism to for TTL or pruning, this will eventually lead to a server crash. I recommend using a logging framework such as winston that supports alternate transports and options to chunk and minimise logs


## No results on first load
Ah. I needed a query string for STATE

## convertStateIdsToAmoc
it reads StateIds. It should be StateId since it only receives a single State ID/CODE
Case is all over the place. Instead I decided to lower case all input strings and work from there, since we don't need to be case sensitive. 

We could do better for types such as convertStateIdsToAmoc since it has a limited amount of string enum it can return.

I would return null, false or throw and error if there is not match so that we aren't trying to process the data. If there is no match we probably want to tell the user or return all of the results for any state.

I wasn't sure if it was by design that we could send empty string to this method `convertStateIdsToAmoc(req.query.state?.toString() || "")`. If it is by design and we want to return all codes the code needs to change on filtering.

## API Route
We have ROOT/?state=QLD and then to ROOT/warning/:id. I prefer to have ROOT/warning (all) ROOT/warning/:state and ROOT/warning/:state/:id. But I understand this is already in production with users already consuming the product and it can be an undertaking to have all of your consumers update their code. I could see this being phased in to improve the developer experience.

## Data.
The same core data that is in a .txt file is also present in the .xml file. We could easily switch to either file and have the exact format that we want. The .xml and the .txt aren't always written at the same time and it is possible that we are out of sync. We should use the XML file (should be easier for a developer to parse)


## Caching
If timely data and caching is imperiative you could use the next-routine-issue-time-X field to put a TTL on the caching for each item.

# A decision needs to be made about batch ahead of time processing
If we are 1000x what is to stop if from 10000x. You might expect at 1000x that most of the warnings are being consumed for each state. We might pull all of the warnings and store the data against the lastModifiedDate to know if there are any changes. 
We can use rawModifiedAt on FileInfo from the FTP file list as a reliable key to know if there is a diff. It is possible there could be a race condition that the XML and the TXT file are not in sync. Which is why I propose that we build that TEXT from .xml manuall intead of the .TXT file.


