import { List } from "antd";
import { formatText } from "../helpers/helpers";

const AllMusicList = ({ results }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={results}
      size="small"
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<span>{item.name}</span>}
            description={
              <div>
                <div>Type: {formatText(item.album_group)}</div>
                <div>Released: {new Date(item.release_date).toLocaleDateString("en-GB")}</div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default AllMusicList;
