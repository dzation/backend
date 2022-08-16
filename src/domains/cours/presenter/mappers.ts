import ID from "@core/entities/id";
import Chapter from "../core/entities/chapter";
import Content from "../core/entities/content";
import Course from "../core/entities/course";

function mapIdIfExists(body: any) {
  if (body.id) {
    return {
      ...body,
      id: new ID(body.id),
    };
  }
  return body;
}
export function CourseMapper(body: any): Course {
  return mapIdIfExists({
    ...body,
  });
}

export function ContentMapper(body: any): Content {
  return mapIdIfExists({
    ...body,
  });
}

export function ChapterMapper(body: any): Chapter {
  return mapIdIfExists({
    ...body,
  });
}

export function FromCourse(body: Course): any {
  return {
    ...body,
    id: body.id.toString(),
  };
}

export function FromContent(body: Content): any {
  return {
    ...body,
    id: body.id.toString(),
  };
}

export function FromChapter(body: Chapter): any {
  return {
    ...body,
    id: body.id.toString(),
  };
}
