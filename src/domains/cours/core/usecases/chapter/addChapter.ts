import { generateID } from "@core/helper";
import UseCase from "@core/interfaces/usecase";
import ChapterRepository from "../../../repositories/chapterRepository";
import Chapter from "../../entities/chapter";
import Course from "../../entities/course";

export default class AddChapterCommand extends UseCase {
  private chapter: Chapter;
  private course: Course;
  private repository: ChapterRepository;

  constructor(
    data: { chapter: Chapter; course: Course },
    repository: ChapterRepository
  ) {
    super();

    this.chapter = {
      ...data.chapter,
      id: generateID(),
    };

    this.course = data.course;

    this.repository = repository;
  }

  async validate(): Promise<boolean> {
    try {
      await this.repository.getChapter(this.chapter.id);
      return false;
    } catch (_) {}

    return true;
  }

  async run(): Promise<any> {
    await this.repository.addChapter(this.course, this.chapter);
  }
}

/**

dzation.com/api/courses/add

-> course (Domain) -> addCourse (Execute)

Service that sum up all the useCases

CourseService.init(Repo1,Repo2);
CourseService.addCourse(courseData)
    final timer = Logger.timer("add new course");
    const command =  new AddChapterCommand(courseData, ChapterRepository)

    
    if(command.validate()){
        final data = await command.execute();

        timer.end("success");
        return data;

    }else {
        timer.end("error")
        throw Error("")
    }
    


    

 */
