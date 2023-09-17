import { Form, Input, Button } from './SearchForm.styled';

export const SearchForm = ({ getSearchQuery }) => {
  return (
    <Form onSubmit={getSearchQuery}>
      <Input
        type="text"
        name="query"
        placeholder="Search movie"
        required
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};
