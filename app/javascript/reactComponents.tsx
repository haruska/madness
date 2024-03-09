import React from "react";
import ReactDOM from "react-dom/client";
import { Tournament } from './components/Tournament'
import { Menu } from './components/Menu'
import { NewBracket } from './components/NewBracket'
import { EditTournament } from './components/EditTournament'

type Components = Record<string, React.ElementType>;
function mount(components: Components): void {
  document.addEventListener("DOMContentLoaded", () => {
    const mountPoints = document.querySelectorAll("[data-react-component]");
    mountPoints.forEach((mountPoint) => {
      const { dataset } = mountPoint as HTMLElement;
      const componentName = dataset.reactComponent;
      if (componentName) {
        const Component = components[componentName];
        if (Component) {
          const props = JSON.parse(dataset.props as string);
          const root = ReactDOM.createRoot(mountPoint);
          // @ts-ignore
          root.render(<Component {...props} />);
        } else {
          console.warn(
            "WARNING: No component found for: ",
            dataset.reactComponent,
            components
          );
        }
      }
    });
  });
}

mount({
  Tournament,
  Menu,
  NewBracket,
  EditTournament
})