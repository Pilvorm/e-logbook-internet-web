import BreadCrumbs from "components/custom/BreadcrumbCustom";
import { useRouter } from "next/router";
import { ArrowLeft } from "react-feather";
import { Button, Card } from "reactstrap";

const FormBlockLayout = ({
  children,
  noBack,
  breadCrumbParent,
  breadCrumbActive,
  pageTitle,
}) => {
  const router = useRouter();

  return (
    <>
      <BreadCrumbs {...{ breadCrumbParent, breadCrumbActive }} />
      <div className="d-flex align-items-center my-3">
        {!noBack && (
          <Button.Ripple
            outline
            type="submit"
            color="danger"
            className="btn-next"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            <span className="ml-50 align-middle d-sm-inline-block d-none">
              Back to Previous Page
            </span>
          </Button.Ripple>
        )}
        <h2 className={`m-0 ${!noBack && "ml-2 pl-2 border-left-dark"}`}>
          {pageTitle}
        </h2>
      </div>
      <Card className="p-4">{children}</Card>
    </>
  );
};

export default FormBlockLayout;
