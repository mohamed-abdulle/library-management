import "./table-filter.sass";
import MySelect from "../my-select/MySelect";

type Props<T extends string> = {
  value: T;
  onChange: (status: T) => void;
  filters: { label: string; value: T }[];
};

export default function TableFilter<T extends string>({
  value,
  onChange,
  filters,
}: Props<T>) {
  return (
    <>
      {/* Desktop */}
      <div className="d-flex gap-2 table-filter desktop-filter">
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            className={`table-filter-btn ${
              value === filter.value ? "active" : ""
            }`}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Mobile */}
      <div className="mobile-filter">
        <MySelect value={value} onChange={onChange} options={filters} />
      </div>
    </>
  );
}
