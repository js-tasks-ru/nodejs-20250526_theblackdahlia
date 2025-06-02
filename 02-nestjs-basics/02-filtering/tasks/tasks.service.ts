import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: 'title' | 'status',
  ): Task[] {
     let filteredTasks = this.tasks;

     // Фильтрация
     if(status) {
       if(!Object.values(TaskStatus).includes(status)) {
          throw new BadRequestException('Invalid status value');
       }
       filteredTasks = filteredTasks.filter(task => task.status === status);
     }

    // Пагинация
     if (page !== undefined || limit !== undefined) {
       if (page < 1 || limit < 1) {
          throw new BadRequestException('Invalid page number');
       }
       const startIndex = (page - 1) * limit;
       const endIndex = startIndex + limit;
       filteredTasks = filteredTasks.slice(startIndex, endIndex);

       if (filteredTasks.length === 0) {
          return [...filteredTasks];
       }
     }

     if (sortBy) {
       if (sortBy !== 'title' && sortBy !== 'status') {
          throw new BadRequestException('Invalid sort by');
       }

       filteredTasks = filteredTasks.sort((a,b) => a[sortBy].localeCompare(b[sortBy]));
     }

    return filteredTasks
  }
}
