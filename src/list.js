import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function ListItems({ data }) {
  return (
    <Box>
      <List>
        {" "}
        {data.map((item, ind) => {
          return (
            <ListItem sx={{ border: "1px solid black", margin : '10px' }} key={ind}>
              {item.title}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
