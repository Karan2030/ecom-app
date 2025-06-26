import { Form } from "react-bootstrap";

export default function Sidebar({ categories, onFilterChange }) {
  return (
    // for filter in side bar
    <div className="p-3">
      <h5>Filter by Category</h5>
      {categories.map((cat) => (
        <Form.Check
          key={cat}
          type="checkbox"
          label={cat}
          value={cat}
          onChange={onFilterChange}
          className="mb-2"
        />
      ))}
    </div>
  );
}