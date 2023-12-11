import BreadCrumbs from "components/custom/BreadcrumbCustom";
import { getPermissionComponent } from "helpers/getPermission";
import { useRouter } from "next/router";
import { Edit2, Plus } from "react-feather";
import { Button, Card } from "reactstrap";

const FormListBlockLayout = ({
  children,
  breadCrumbParent,
  breadCrumbActive,
  pageTitle,
  data,
  editPagePath,
  addPagePath,
  buttonPermission,
}) => {
  const router = useRouter();

  return (
    <>
      <BreadCrumbs {...{ breadCrumbParent, breadCrumbActive }} />
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="m-0">{pageTitle}</h2>
        {getPermissionComponent(buttonPermission) &&
          (data?.data.length === 0 ? (
            <Button.Ripple
              type="button"
              color="primary"
              onClick={() => router.push(addPagePath)}
            >
              <Plus size={18} />
              <span className="align-middle ml-1 d-sm-inline-block d-none">
                Add New
              </span>
            </Button.Ripple>
          ) : (
            <Button.Ripple
              type="button"
              color="primary"
              onClick={() => router.push(editPagePath)}
            >
              <Edit2 size={18} />
              <span className="align-middle ml-1 d-sm-inline-block d-none">
                Edit
              </span>
            </Button.Ripple>
          ))}
      </div>
      <Card className="p-4">{children}</Card>
    </>
  );
};

export default FormListBlockLayout;
