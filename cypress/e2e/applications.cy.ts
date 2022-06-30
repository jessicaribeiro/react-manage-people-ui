/// <reference types="cypress" />

describe('Applications Table', () => {

    describe('UI Components', () => {
        // convert string to number
        const toNumbers = (values: any) => Cypress._.map(values, Number)

        // convert to string
        const toStrings = (cells$: any) => Cypress._.map(cells$, 'textContent')

        beforeEach(() => {
            cy.server();
            // Total of items/candidates: 20
            cy.route('GET', '*', 'fixture:candidate.json');
            cy.visit('http://localhost:3000')

        });

        it('should display no candidates', () => {
            cy.route('GET', '*', []);
            cy.contains('There is no available data to display');
        });

        it('should successfully load the initial page', () => {
            // Should display 15 candidates
            cy.get('[data-testid=table-candidates]').children().should('have.length', 15);

            cy.contains('Applications');
        });

        describe('Filters', () => {

            it('should filter candidates by Status', () => {
                const statusFilterComponent = () => cy.get('[data-testid=filter-by-status]');

                statusFilterComponent().within(() => {
                    cy.get("select").select('Approved');
                    cy.get("select").find('option:selected').should('have.text', 'Approved')
                });

                // Wait to filter all
                cy.wait(1000);

                // Should add position to query parameters
                cy.location().should((loc) => {
                    expect(loc.search).to.eq('?status=approved')
                })

                cy.contains('Ester Williamson');
                cy.contains('Ester Mill');
                cy.contains('Kristopher Mills');
            });

            it('should filter data by Position', () => {
                const positionFilterComponent = () => cy.get('[data-testid=filter-by-position]');

                positionFilterComponent().within(() => {
                    cy.get("select").select('Designer');
                });

                // Wait to filter all
                cy.wait(1000);

                // Should add position to query parameters
                cy.location().should((loc) => {
                    expect(loc.search).to.eq('?position=designer')
                })

                cy.contains('Colette Morar');
            });

            it('should filter data by Name, Status and Position at the same time', () => {
                const statusFilterComponent = () => cy.get('[data-testid=filter-by-status]');
                const positionFilterComponent = () => cy.get('[data-testid=filter-by-position]');

                cy.get('[data-testid=filter-by-name]').type('Ester');

                statusFilterComponent().within(() => {
                    cy.get("select").select('approved');
                });
                positionFilterComponent().within(() => {
                    cy.get("select").select('Manager');
                });

                // Wait to filter all
                cy.wait(1000);

                // Should add name, status and position to query parameters
                cy.location().should((loc) => {
                    expect(loc.search).to.eq('?name=Ester&status=approved&position=manager')
                })

                cy.contains('Ester Mill');
            });
        });

        describe('Sort', () => {

            it('should sort by year of experience', () => {
                // Click to sort by year of experience
                cy.get('[data-testid=sort-by-year_of_experience]').should('be.visible').click({ force: true });

                // Wait to sort all
                cy.wait(1000);

                // Should add sortKey and sortOrder to query parameters
                cy.location().should((loc) => {
                    expect(loc.search).to.eq('?sortKey=year_of_experience&sortOrder=desc')
                })

                // obtain the cells from the colum "year of experience" and sort them
                cy.get('[data-testid=col-year_of_experience]')
                    .then(toNumbers)
                    .then((years) => {
                        // confirm years are sorted by sorting them and comparing with the input list
                        const sorted = Cypress._.sortBy(years)

                        expect(years).to.deep.equal(sorted);
                    })
            })

            it('should sort by position applied', () => {
                // Click to sort by position applied
                cy.get('[data-testid=sort-by-position_applied]').should('be.visible').click({ force: true });

                // Wait to sort all
                cy.wait(1000);

                // Should add sortKey and sortOrder to query parameters
                cy.location().should((loc) => {
                    expect(loc.search).to.eq('?sortKey=position_applied&sortOrder=desc')
                })

                // obtain the cells from the colum "position applied" and sort them
                // cy.get('[data-testid=col-position_applied]')
                //     .then(toStrings)
                //     .then((position) => {
                //         const sorted = Cypress._.sortBy(position)
                //
                //         expect(position).to.deep.equal(sorted);
                //     })
            })

            it('should sort by application date', () => {
                // Click to sort by application date
                cy.get('[data-testid=sort-by-application_date]').should('be.visible').click({ force: true });

                // Should add sortKey and sortOrder to query parameters
                cy.location().should((loc) => {
                    expect(loc.search).to.eq('?sortKey=application_date&sortOrder=desc')
                })
            })
        })

        it('should select last page', () => {
            // Obtain Pagination section
            const paginationComponent = () => cy.get('[data-testid=pagination]');

            // Select last button of pagination
            paginationComponent().within(() => {
                cy.get('ul li:last > button').should('exist').click();
            });

            // Should only display 5 candidates
            cy.get('[data-testid=table-candidates]').children().should('have.length', 5);
        });
    });

    it('should be successful the API call request', () => {
        cy.request('https://personio-fe-test.herokuapp.com/api/v1/candidates').as('apiRequest');
        cy.get('@apiRequest').then(response => {
            // @ts-ignore
            expect(response.status).to.eq(200);
        });
    });

})
