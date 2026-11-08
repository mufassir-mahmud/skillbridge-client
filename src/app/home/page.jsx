import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import SearchSection from "@/components/SearchSection"


const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <SearchSection></SearchSection>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default HomePage;