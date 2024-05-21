import boto3
import sys

def manage_stack(action, stack_type):
    file_map = {
        'network': ('network.yml', 'network-parameters.json'),
        'udagram': ('udagram.yml', 'udagram-parameters.json'),
        's3bucket': ('s3bucket.yml', 's3bucket-parameters.json')
    }

    template_file, parameters_file = file_map[stack_type]

    with open(template_file, 'r') as file:
        template_body = file.read()
    with open(parameters_file, 'r') as file:
        parameters = file.read()

    cf = boto3.client('cloudformation')

    if action == 'create':
        response = cf.create_stack(
            StackName=f"{stack_type}-stack",
            TemplateBody=template_body,
            Parameters=eval(parameters),
            Capabilities=['CAPABILITY_IAM', 'CAPABILITY_NAMED_IAM'],
            OnFailure='DELETE'
        )
        print(f"Creating stack {stack_type}-stack...")
    elif action == 'update':
        response = cf.update_stack(
            StackName=f"{stack_type}-stack",
            TemplateBody=template_body,
            Parameters=eval(parameters),
            Capabilities=['CAPABILITY_IAM', 'CAPABILITY_NAMED_IAM']
        )
        print(f"Updating stack {stack_type}-stack...")
    elif action == 'delete':
        response = cf.delete_stack(StackName=f"{stack_type}-stack")
        print(f"Deleting stack {stack_type}-stack...")
    else:
        print("Invalid action specified")
        return

    print(response)

if __name__ == "__main__":
    action = sys.argv[1]  # 'create', 'update', or 'delete'
    stack_type = sys.argv[2]  # 'network', 'udagram', or 's3bucket'
    manage_stack(action, stack_type)
