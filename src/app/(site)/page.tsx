import { Suspense } from "react";
import AppBar from "../custom/components/AppBar";
import CustomCard from "../custom/components/Card";
import Container from "../custom/components/Container";
import { IUser } from "@/app/custom/components/AppBar";
import { Loader2 } from "lucide-react";
import { Vehicle } from "@prisma/client";

async function getVehicles() {
  const res = await fetch(`http://localhost:3000/api/v1/vehicle/all`);
  return res.json();
}

export interface ResponseData<T> {
  data: T;
}

const Page = async () => {
  const vehicles: ResponseData<Vehicle[]> = await getVehicles();
  const data: IUser = {
    email: "dewarmurdiarta@gmail.com",
  };
  console.log(vehicles.data);
  return (
    <Container>
      <AppBar session={data} />
      <Suspense
        fallback={
          <Container>
            <div className="px-8 pt-5">
              <div className="flex justify-start items-center gap-2">
                <Loader2 className="animate-spin" />
                <h1>Loading</h1>
              </div>
            </div>
          </Container>
        }
      >
        <div className="grid grid-cols-5 mt-10 gap-10 mx-20">
          {vehicles.data &&
            vehicles.data.map((vehicle, i) => {
              return (
                <CustomCard
                  key={i}
                  model={vehicle.model}
                  year={vehicle.year}
                  identityNumber={vehicle.identityNumber}
                  weeklyRate={vehicle.price}
                  dailyRate={vehicle.price}
                  type={vehicle.type}
                  imageUrl="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
              );
            })}
        </div>
      </Suspense>
    </Container>
  );
};

export default Page;
