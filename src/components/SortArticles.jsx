import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export default function Sort(props) {
  const { setSortParams } = props;

  const orderBys = [
    { displayVal: 'ascending', queryVal: 'asc' },
    { displayVal: 'descending', queryVal: 'desc' },
  ];
  const sortBys = [
    { displayVal: 'date', queryVal: 'created_at' },
    { displayVal: 'comments', queryVal: 'comment_count' },
    { displayVal: 'votes', queryVal: 'votes' },
  ];

  const handleChange = (key, value) => {
    setSortParams((curr) => {
      return { ...curr, [key]: value };
    });
  };

  return (
    <>
      <div className="sort-container">
        <Select
          onValueChange={(value) => {
            handleChange('sort_by', value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              {sortBys.map((sort) => {
                return (
                  <SelectItem key={sort.displayVal} value={sort.queryVal}>
                    {sort.displayVal}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            handleChange('order_by', value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Order by</SelectLabel>
              {orderBys.map((order) => {
                return (
                  <SelectItem key={order.displayVal} value={order.queryVal}>
                    {order.displayVal}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
