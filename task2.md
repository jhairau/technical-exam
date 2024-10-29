# TOP 5 items
Use good principals instead of just what we see
1. Security
2. Reliability (Accurate and Uptime)
3. Performance (User Experience)
4. Maintainability
5. Cost

## Security
Dependency locking and updates (sem ver, related to Nodemon)

## Reliablity
### Uptime / Debugging - Logging
Destined to fail if we are conintually running on server and the logs are not pruned. Recommend using something like Winston with an alternate transport to store on a 3rd party. You don't want to have to SSH into your box to look at your logs, if you server goes down you can't view your logs and if you are running multiple instances your logs are isolated.

### Accurate
The XML file and the TXT file aren't always in sync on the FTP server. Best to build from just the XML file and mimic the format in the text file.

### Caching - Uptime and performance
Looking at 1000x consumption gains. Recommend two divergent approaches

#### In memory cache
I see that inflight and possibly lru-cache could be used. It feels like this could get out of hand with all of the data that we want to store. I'm uncomfortable with this being the only caching mechanism. I wouldn't try to over-optimise and place this in front of redis to save some MS at the risk of degrading system performance due to memory usage.

#### Traditional Redis with pre-processing
With this approach I would pre-fetch the data and process it ahead of time on an interval such as 5 minutes to help improve the timeliness of the data (checking for rawModifiedAt timestamps from FTP client to only update when needed). This can lead to overworking, but ensures that data is available consitently. If I was to overengineer this I would use next-routine-issue-time-X that is on each amoc.xml file as an indicator of perhaps when I would want to pull an individual stream of data.

#### Nonconventational CloudFront caching for GET requests
With this approach I would leverage the caching ability of CloudFront to offload a lof of the work and can leverage edge caching. `cache-control: max-age` can be sent my the express server to instruct on how long to cache each request.

We can use `stale-while-revalidate` to return stale data immediately to the consumer but then async go get the data from storage.

`stale-if-error` could also be an option if server was down to increase perceived uptime.

Though not popular I could see the data being stored in S3 for this approach. That data is barely structured, doesn't require indexing and the only relationship is the Australian state. There would be no need for maintenance as there would be for a database. We also would neve need to worry about connection limits and cost is ultra low.

## Performance
Requsting data from BOM on the fly is slow and resource consuming. Users expect sub 300ms (my opinion). Two `serial` network requests were made to get the data for a single result, propse that we just get the .xml file and format the data to look like `text` this would also fix the `race` condition with .txt and .xml being out of sync.

TS-NODE: Additional overhead and uncomfortable with transpiling at run time

## Maintainability
Types should be more clearly used
Linting should be enabled
Code style (fat arrow functions, imports)
Try catch statements lead to no where
Error codes
Error logging
Toggle detailed reporting (ftp.client.verbose) // too much mess for 
.env variables for FTP settings
Build artifacts

## Cost
Discussion on Cost depending on approach. S3 with Cloudfront seems more cost effective than Redis and tradiational database with failover. Need better data about pre-fetching and what would be acceptable to request on the fly.