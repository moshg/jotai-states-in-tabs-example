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
import {
  Provider as JotaiProvider,
  atom,
  createStore,
  useAtomValue,
  useSetAtom,
} from "jotai";
import { useMemo, useState } from "react";

function App() {
  const tabs = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: `tab-${i}`,
        name: `Tab ${i}`,
      })),
    []
  );
  const [tabIndex, setTabIndex] = useState(0);

  const stores = useMemo(
    () => Object.fromEntries(tabs.map((tab) => [tab.id, createStore()])),
    [tabs]
  );

  return (
    <ChakraProvider>
      <Tabs tabIndex={tabIndex} onChange={setTabIndex}>
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.id}>{tab.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          <JotaiProvider store={stores[tabs[tabIndex].id]}>
            <Box p={4}>
              <Counter key={tabs[tabIndex].id} />
            </Box>
          </JotaiProvider>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}

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

export default App;
