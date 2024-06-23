import {
  Box,
  Button,
  ChakraProvider,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";

const countAtom = atom(0);
const incrementAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});

function Counter() {
  const count = useAtomValue(countAtom);
  const incrementCount = useSetAtom(incrementAtom);

  return (
    <Stack>
      <Text>{count}</Text>
      <Button onClick={incrementCount}>+1</Button>
    </Stack>
  );
}

function App() {
  const [tabs] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({ id: `tab-${i}`, name: `Tab ${i}` }))
  );
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <ChakraProvider>
      <Tabs tabIndex={tabIndex} onChange={setTabIndex}>
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.id}>{tab.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          <Box p={4}>
            <Counter key={tabs[tabIndex].id} />
          </Box>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}

export default App;
