import { render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import ArticlesTable from "../ArticlesTable";
import { useRouter } from "next/router";

const CATEGORIES_MOCK = [
    {
        _id: 2,
        name: "Technology"
    },
    {
        _id: 6,
        name: "Landscapes"
    },
    {
        _id: 19,
        name: "Travels"
    }
];

const RESPONSE_MOCK = {
    articles: [
        {
            _id: 999,
            cover: "test.jpg",
            title: "Test title",
            dayViews: 100,
            monthViews: 500,
            totalViews: 1000
        }
    ],
    pagination: {
        hasPrevPage: true,
        prevPage: 5,
        hasNextPage: true,
        nextPage: 7,
        pages: [
            { number: 2, active: false },
            { number: 3, active: false },
            { number: 4, active: false },
            { number: 5, active: false },
            { number: 6, active: true },
            { number: 7, active: false },
            { number: 8, active: false }
        ]
    }
}

let container;

describe("<ArticlesTable/> component", () => {
    beforeEach(() => {
        fetchMock.doMock();
        fetchMock
            .once(JSON.stringify(CATEGORIES_MOCK))
            .once(JSON.stringify({
                data: RESPONSE_MOCK
            }));

        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        fetchMock.mockReset();

        document.body.removeChild(container);
        container = null;
    });

    it("should call the api to get the articles", async () => {
        Object.defineProperty(window, "location", {
            value: {
                search: "?sort=day"
            }
        });
        
        await act(async () => {
            render(<ArticlesTable/>, container); 
        });

        const fecthCall = fetchMock.mock.calls[1];

        expect(fecthCall[0]).toBe(WEBSITE_URL + "api/articles?sort=day");
    });

    it("should set the articles", async () => {
        await act(async () => {
            render(<ArticlesTable/>, container); 
        });

        const articleTitle = container.querySelector(".custom-table__article__title");
        const articleViews = container.querySelectorAll(".custom-table__article__data");

        expect(articleTitle.textContent).toBe("Test title");
        expect(articleViews[0].textContent).toBe("100");
        expect(articleViews[1].textContent).toBe("500");
        expect(articleViews[2].textContent).toBe("1 000");
    });

    it("should call the api when we change the window.location.search", async () => {
        await act(async () => {
            render(<ArticlesTable/>, container); 
        });

        fetchMock.mockReset();
        fetchMock
        .once()
        .once(JSON.stringify({
            data: {
                RESPONSE_MOCK
            }
        }));

        window.location.search = "?sort=month";

        await act(async () => {
            render(<ArticlesTable/>, container); 
        });

        const fecthCall = fetchMock.mock.calls[0];
        expect(fecthCall[0]).toBe(WEBSITE_URL + "api/articles?sort=month");
    });

    it("It change the 'sort' paramter when we click in the sort labels", async () => {
        const routerPush = jest.fn();

        useRouter.mockImplementation(() => ({
            query: { test: "test" },
            pathname: "/",
            push: routerPush
        }));
        
        await act(async () => {
            render(<ArticlesTable/>, container); 
        });

        const sortLabels = container.querySelectorAll(".dashboard-articles-table__sort-label");

        act(() => Simulate.click(sortLabels[0]));

        expect(routerPush).toHaveBeenCalledWith({
            pathname: "/",
            query: { test: "test", sort: "dayViews" }
        });

        routerPush.mockReset();

        act(() => Simulate.click(sortLabels[1]));

        expect(routerPush).toHaveBeenCalledWith({
            pathname: "/",
            query: { test: "test", sort: "monthViews" }
        });

        routerPush.mockReset();

        act(() => Simulate.click(sortLabels[2]));

        expect(routerPush).toHaveBeenCalledWith({
            pathname: "/",
            query: { test: "test", sort: "totalViews" }
        });
    });
});