import { Entities } from "./constants";
import sendRequest from "./sendRequest";

interface ResolveApiEntityArgs {
  entity: Entities;
  id: string;
}

export const resolveAPIEntity = async ({
  entity,
  id
}: ResolveApiEntityArgs) => {
  switch (entity) {
    case Entities.SearchResult:
      return await sendRequest(`/person/search/${id}`);
    case Entities.Person:
      return sendRequest(`/person/detail/${id}`);
    case Entities.News:
      return sendRequest(`/person/news/${id}`);
  }
};

export default resolveAPIEntity;
