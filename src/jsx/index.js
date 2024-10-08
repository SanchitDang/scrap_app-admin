import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";

/// Users
import UsersList from "./components/Users/UsersList";
import CreateUser from "./components/Users/CreateUser";
import EditUser from "./components/Users/EditUser";

/// Agents
import AgentsList from "./components/Agents/AgentsList";
import CreateAgent from "./components/Agents/CreateAgent";
import EditAgent from "./components/Agents/EditAgent";

/// Inventory Managers
import InventoryManagersList from "./components/InventoryManagers/InventoryManagersList";
import CreateInventoryManager from "./components/InventoryManagers/CreateInventoryManager";
import EditInventoryManager from "./components/InventoryManagers/EditInventoryManager";

/// Service Requests
import ServiceRequestsList from "./components/ServiceRequests/ServiceRequestsList";
import CreateServiceRequest from "./components/ServiceRequests/CreateServiceRequest";
import EditServiceRequest from "./components/ServiceRequests/EditServiceRequest";
import GenerateInvoiceServiceRequest from "./components/ServiceRequests/GenerateInvoiceServiceRequest";
import InvoicePO from "./components/ServiceRequests/InvocePO";
import InvoiceSimple from "./components/ServiceRequests/InvoceSimple";

/// Categories
import CategoriesList from "./components/Categories/CategoriesList";
import CreateCategory from "./components/Categories/CreateCategory";
import EditCategory from "./components/Categories/EditCategory";

/// Products
import ProductsList from "./components/Products/ProductsList";
import CreateProduct from "./components/Products/CreateProduct";
import EditProduct from "./components/Products/EditProduct";

/// Invoice
import CreateInvoice from "./components/Invoice/CreateInvoice";
import GenerateInvoice from "./components/Invoice/GenerateInvoce";

/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import MyWallet from "./components/Dashboard/MyWallet";
import InvoicesList from "./components/Dashboard/InvoicesList";
import CreateInvoices from "./components/Dashboard/CreateInvoices";
import CardCenter from "./components/Dashboard/CardCenter";
import TransactionDetails from "./components/Dashboard/TransactionDetails";
import Task from "./components/Dashboard/Task";

///// Demo
import Theme1 from "./components/Dashboard/Demo/Theme1";
import Theme2 from "./components/Dashboard/Demo/Theme2";
import Theme3 from "./components/Dashboard/Demo/Theme3";
import Theme4 from "./components/Dashboard/Demo/Theme4";
import Theme5 from "./components/Dashboard/Demo/Theme5";
import Theme6 from "./components/Dashboard/Demo/Theme6";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import MainNouiSlider from "./components/PluginsMenu/NouiSlider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

// Redux
import Todo from "./pages/Todo";

/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "../context/ThemeContext";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [

    /// Users
    { url: "users-list", component: UsersList },
    { url: "create-user", component: CreateUser },
    { url: "edit-user/:id", component: EditUser },

    /// Agents
    { url: "agents-list", component: AgentsList },
    { url: "create-agent", component: CreateAgent },
    { url: "edit-agent/:id", component: EditAgent },

    /// Inventory Managers
    { url: "inventorymanagers-list", component: InventoryManagersList },
    { url: "create-inventorymanager", component: CreateInventoryManager },
    { url: "edit-inventorymanager/:id", component: EditInventoryManager },

    /// Service Requests
    { url: "servicerequests-list/:utype", component: ServiceRequestsList },
    { url: "create-servicerequest", component: CreateServiceRequest },
    { url: "edit-servicerequest/:id", component: EditServiceRequest },
    { url: "generate-invoice-servicerequest/:id", component: GenerateInvoiceServiceRequest },
    { url: "final-generate-invoice-servicerequest/:data", component: InvoicePO },
    { url: "final-generate-invoice-simple-servicerequest/:data", component: InvoiceSimple },

    /// Categories
    { url: "categories-list", component: CategoriesList },
    { url: "create-category", component: CreateCategory },
    { url: "edit-category/:id", component: EditCategory },

    /// Products
    { url: "products-list", component: ProductsList },
    { url: "create-product", component: CreateProduct },
    { url: "edit-product/:id", component: EditProduct },

    //// Invoice
    { url: "create-invoice", component: CreateInvoice },
    { url: "generate-invoice/:data", component: GenerateInvoice },

    /// Dashboard
    { url: "", component: Home },
    { url: "dashboard", component: Home },
    { url: "dashboard-dark", component: DashboardDark },
    { url: "wallet", component: MyWallet },
    { url: "invoices-list", component: InvoicesList },
    { url: "create-invoices", component: CreateInvoices },
    { url: "card-center", component: CardCenter },
    { url: "transaction-details", component: TransactionDetails },
    { url: "task", component: Task },
	
	  ///Demo
    { url: "theme1", component: Theme1 },
    { url: "theme2", component: Theme2 },
    { url: "theme3", component: Theme3 },
    { url: "theme4", component: Theme4 },
    { url: "theme5", component: Theme5 },
    { url: "theme6", component: Theme6 },
	
	  /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },
    { url: "post-details", component: PostDetails },

    /// Chart
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

    /// Bootstrap
    { url: "ui-alert", component: UiAlert },
    { url: "ui-badge", component: UiBadge },
    { url: "ui-button", component: UiButton },
    { url: "ui-modal", component: UiModal },
    { url: "ui-button-group", component: UiButtonGroup },
    { url: "ui-accordion", component: UiAccordion },
    { url: "ui-list-group", component: UiListGroup },
    { url: "ui-card", component: UiCards },
    { url: "ui-carousel", component: UiCarousel },
    { url: "ui-dropdown", component: UiDropDown },
    { url: "ui-popover", component: UiPopOver },
    { url: "ui-progressbar", component: UiProgressBar },
    { url: "ui-tab", component: UiTab },
    { url: "ui-pagination", component: UiPagination },
    { url: "ui-typography", component: UiTypography },
    { url: "ui-grid", component: UiGrid },

    /// Plugin
    { url: "uc-select2", component: Select2 },
    { url: "uc-noui-slider", component: MainNouiSlider },
    { url: "uc-sweetalert", component: MainSweetAlert },
    { url: "uc-toastr", component: Toastr },
    { url: "map-jqvmap", component: JqvMap },
    { url: "uc-lightgallery", component: Lightgallery },

    ///Redux
    { url: "todo", component: Todo },
	
    /// Widget
    { url: "widget-basic", component: Widget },

    /// Shop
    { url: "ecom-product-grid", component: ProductGrid },
    { url: "ecom-product-list", component: ProductList },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-product-order", component: ProductOrder },
    { url: "ecom-checkout", component: Checkout },
    { url: "ecom-invoice", component: Invoice },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-customers", component: Customers },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-validation-jquery", component: jQueryValidation },

    /// table
	  { url: 'table-filtering', component: FilteringTable },
    { url: 'table-sorting', component: SortingTable },
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// pages
    { url: "page-register", component: Registration },
    { url: "page-lock-screen", component: LockScreen },
    { url: "page-login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];
  
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>      
	  <ScrollToTop />
    </>
  );
};

export default Markup;
