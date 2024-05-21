CD12352 - Infrastructure as Code Project Solution

Tai Sy Tran

# Spin up instructions

python manage_stack.py create network
python manage_stack.py create udagram


# Tear down instructions
```bash
python manage_stack.py delete network
python manage_stack.py delete udagram
```
# Other considerations
```bash
python manage_stack.py update network
python manage_stack.py update udagram
```

URL: http://udagra-webap-rpexz9dyhlfw-974045387.us-east-1.elb.amazonaws.com/

# TODO: 

- [ ] fix issue template autoscalling not working (not clue yet)
- [ ] fix issue s3 creation (issue: Resource handler returned message: "Access Denied (Service: S3, Status Code: 403, RequestID)
