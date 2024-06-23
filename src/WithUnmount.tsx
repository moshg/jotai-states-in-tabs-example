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
import { useCallback, useMemo, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Stack>
      <Text>{count}</Text>
      <Button onClick={useCallback(() => setCount((count) => count + 1), [])}>
        +1
      </Button>
    </Stack>
  );
}

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

  return (
    <ChakraProvider>
      <Tabs onChange={setTabIndex}>
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
