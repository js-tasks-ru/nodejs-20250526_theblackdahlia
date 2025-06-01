import { Injectable, NotFoundException } from "@nestjs/common";
import {Task, TaskStatus} from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`task with id ${id} not found`);
    return task
  }

  createTask(task: Task): Task {
    const taskData = {
      id: Math.random().toString(36).substring(2, 9),
      description: task.description,
      status: task.status,
      title: task.title,
    }

    this.tasks.push(taskData);
    return taskData;
  }

  updateTask(id: string, updateData: Task): Task {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updateData,
    };

    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter(t => t.id !== id);
    return task;
  }
}

