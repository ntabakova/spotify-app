import { List } from "antd";
import { Link } from "react-router-dom";

const SearchList = ({ results }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={results}
      size="small"
      renderItem={(artist) => (
        <List.Item
          actions={[
            <Link to={`/artists/${artist.id}/${artist.name}/albums`} key="albums" target="_blank">
              See albums
            </Link>,
            <Link to={`/artists/${artist.id}/${artist.name}/music`} key="all-music" target="_blank">
              See all music
            </Link>,
          ]}
        >
          <List.Item.Meta
            title={<span>{artist.name}</span>}
            description={artist.genres.join(", ")}
          />
        </List.Item>
      )}
    />
  );
};

export default SearchList;
