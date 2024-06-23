import {
  Button,
  ChakraProvider,
  Stack,
  Tab,
  TabList,
  TabPanel,
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
  // 実際にはAPIなどで初期化する
  const tabs = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: `tab-${i}`,
        name: `Tab ${i}`,
      })),
    []
  );

  return (
    <ChakraProvider>
      <Tabs>
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.id}>{tab.name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.id}>
              <Counter />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}

export default App;
