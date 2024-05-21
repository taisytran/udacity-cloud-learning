import * as AWS from 'aws-sdk';
//import * as AWSXRay from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { TodoItem } from '../models/TodoItem';
import { TodoUpdate } from '../models/TodoUpdate';

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

const logger = createLogger('TodosAccess');

// TODO(done): Implement the dataLayer logic
export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE
  ) {}

  async getTodos(userId: string): Promise<TodoItem[]> {
    logger.info('Get all todo items')
    const result = await this.docClient.query({
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    return result.Items as TodoItem[]
  }

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
    logger.info('Create a new todo item')
    const result = await this.docClient.put({
      TableName: this.todosTable,
      Item: todoItem
    }).promise()

    logger.info(result)

    return todoItem
  }

  async updateTodo(userId: string, todoId: string, todoData: TodoUpdate): Promise<string> {
    logger.info(`Update a todo item ${todoId}`)
    const result = await this.docClient.update({
      TableName: this.todosTable,
      Key: { userId, todoId },
      ConditionExpression: 'attribute_exists(todoId)',
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done =:done',
      ExpressionAttributeNames: {
        '#name': 'name' // Reserved words
      },
      ExpressionAttributeValues: {
        ':name': todoData.name,
        ':dueDate': todoData.dueDate,
        ':done': todoData.done
      }
    }).promise()

    logger.info(result)

    return todoId
  }

  async deleteTodo(userId: string, todoId: string): Promise<string> {
    logger.info(`Delete a todo item ${todoId}`)
    const result = await this.docClient.delete({
      TableName: this.todosTable,
      Key: { userId, todoId }
    }).promise()

    logger.info(result)

    return todoId
  }

  async updateAttachmentUrl(userId: string, todoId: string, attachmentUrl: string): Promise<string> {
    logger.info(`Update a todo item attachment url ${todoId}`)
    const result = await this.docClient.update({
      TableName: this.todosTable,
      Key: {userId, todoId },
      ConditionExpression: 'attribute_exists(todoId)',
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl
      }
    }).promise()

    logger.info(result)

    return attachmentUrl
  }
}
