1. Minimum RTO for a single AZ outage
With Multi-AZ configuration is typically on the order of a few minutes.
Amazon RDS, when configured with Multi-AZ deployment, automatically
replicates the primary database to a standby instance in a different AZ
within the same region.


2. Minimum RTO for a single region outage

AWS services offer features like Cross-Region Replication (CRR) and
automated tools for failover, such as Amazon Aurora Global Databases or
read replicas in a different region

The RTO for a single region outage can range from several minutes to
potentially longer.

3. Minimum RPO for a single AZ outage
Multi-AZ configuration is typically very low. Amazon RDS, when
configured with Multi-AZ deployment, uses synchronous replication to
replicate the primary database to a standby instance in a different AZ
within the same region.

The RPO in a Multi-AZ configuration is generally minimal, often ranging
from near-zero to just a few seconds. This low RPO is a key advantage of
Multi-AZ deployments, providing a high level of data consistency and
minimizing the risk of data loss during failover events


4. Minimum RPO for a single region outage
Asynchronous replication is commonly employed to replicate data from the
primary region to the standby region

The minimum RPO could range from several seconds to minutes.


