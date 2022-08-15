import UseCase from "../../../../../core/interfaces/usecase";
import CourseRepository from "../../../repositories/courseRepository";
import Chapter from "../../entities/chapter";
import Course from "../../entities/course";

export default class AddChapterCommand<T extends any> implements UseCase {
  private chapter: Chapter;
  private repository: CourseRepository;

  constructor(chapter: Chapter, repository: CourseRepository) {
    this.chapter = chapter;
    this.repository = repository;
  }
  async validate(): Promise<boolean> {
    try {
      await this.repository.getCourse(this.chapter.id);
      return false;
    } catch (_) {
      return true;
    }
  }

  async run(): Promise<any> {
    await this.repository.addCourse(this.chapter as any as Course);
  }
}

/**

dzation.com/api/courses/add

-> course (Domain) -> addCourse (Execute)

Service that sum up all the useCases

CourseService.init(Repo1,Repo2);
CourseService.addCourse(courseData)
    final timer = Logger.timer("add new course");
    const command =  new AddChapterCommand(courseData, CourseRepository)

    
    if(command.validate()){
        final data = await command.execute();

        timer.end("success");
        return data;

    }else {
        timer.end("error")
        throw Error("")
    }
    


    

 */
