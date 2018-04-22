// @flow

type Data = Array<{ [key: string]: any }>;

export default class DataTable {
    parent: HTMLElement;
    data: Data;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    get dataTable(): ?HTMLElement {
        let activeTable = document.querySelector('.dataTable.active');
        if (activeTable) {
            return activeTable;
        }
    };

    get currPageSize(): ?number {
        if (this.dataTable) {
            let select = this.dataTable.querySelector('select');
            if (select instanceof HTMLSelectElement) {
                return Number(select.value);
            }
        }
    };

    createDataTable(data: Data) {
        let dataTable = document.createElement('div');
        let counter = 1;

        if (document.body) {
            document.body.appendChild(dataTable);
        }

        while (document.getElementById('dataTable' + counter)) {
            counter++;
        }

        [...document.querySelectorAll('.dataTable')].forEach(item => item.classList.remove('active'));
        dataTable.id = String('dataTable' + counter);
        dataTable.classList.add('dataTable', 'active');
        dataTable.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();

            if (!dataTable.classList.contains('active')) {
                [...document.querySelectorAll('.dataTable')].forEach(item => item.classList.remove('active'));
                dataTable.classList.add('active');
            }
        });
    };

    createTable(data: Data) {
        let table = document.createElement('table');
        table.classList.add('table');

        if (this.dataTable) {
            this.dataTable.appendChild(table);
        }

        let thead = document.createElement('thead');
        table.appendChild(thead);
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);
        let tr = document.createElement('tr');
        thead.appendChild(tr);

        let objKeys = Object.keys(data.reduce((prev, curr) => Object.keys(curr).length > Object.keys(prev).length ? curr : prev, {}));

        objKeys.map(key => {
            let th = document.createElement('th');
            tr.appendChild(th);
            th.classList.add('th');

            let a = document.createElement('a');
            th.appendChild(a);
            a.href = '#';
            a.innerText = key;
            a.dataset.id = key;
            a.classList.add('btn-sort');
            a.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();
                this.sortTable(data, a, key);
            })
        });
    };

    createPageSize(data: Data) {
        let pageControls = document.createElement("div");
        pageControls.classList.add('controls');
        let select = document.createElement('SELECT');
        select.classList.add('select');

        if (this.dataTable) {
            this.dataTable.appendChild(pageControls);
        }

        pageControls.appendChild(select);

        const createOption = (...pageSizes) => {
            [...pageSizes].forEach((item, index) => {
                let option = document.createElement('option');
                let value = document.createTextNode(item);
                option.setAttribute('value', item);
                option.appendChild(value);
                select.appendChild(option);

                if (index === 0) {
                    option.disabled = true
                }
            });
        };

        createOption('...', '10', '25', '50', '100');

        let currPageSize = this.currPageSize;
        select.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();

            if (select.value && select instanceof HTMLSelectElement) {
                if (select.value !== ('...') && Number(select.value) !== currPageSize) {
                    this.getPageSize(data, Number(select.value));
                }

                currPageSize = Number(select.value);
            }
        });
    };

    createPagination() {
        if (this.dataTable) {
            let pageControls = this.dataTable.querySelector('.controls');

            if (pageControls) {
                let pagination = document.createElement('nav');
                pagination.classList.add('pagination');
                pageControls.appendChild(pagination);

                let dotsPrev = document.createElement('span');
                dotsPrev.classList.add('dots');
                dotsPrev.innerText = '...';
                let dotsNext = dotsPrev.cloneNode(true);

                const createPaginationLink = (name: string, className: string) => {
                    let link = document.createElement('a');
                    pagination.appendChild(link);
                    link.href = '#';
                    link.innerText = name;
                    link.classList.add('btn-control', className);
                };

                createPaginationLink('1', 'firstPage');
                pagination.appendChild(dotsPrev);

                createPaginationLink('', 'numPage');
                createPaginationLink('', 'numPage');
                createPaginationLink('', 'numPage');

                pagination.appendChild(dotsNext);
                createPaginationLink('', 'lastPage');
            }
        }
    };

    getPageSize(data: Data, pageSize: number) {
        if (this.dataTable) {
            if (!this.dataTable.querySelector('.pagination')) {
                this.createPagination();
                this.pagination(data);
            }

            let numberPerPage = pageSize;
            let numberOfPages = Math.ceil(data.length / numberPerPage);
            if (this.dataTable) {
                let lastPage = this.dataTable.querySelector('.lastPage');
                if (lastPage) {
                    lastPage.innerText = String(numberOfPages);
                }
            }

            this.redrawPagination(data, 1, numberPerPage);
        }
    };

    pagination(data: Data, currentPage: number = 1) {
        let dataTable = this.dataTable;
        if (dataTable) {
            let firstPageBtn = dataTable.querySelector('.firstPage');
            let lastPageBtn = dataTable.querySelector('.lastPage');

            const firstPage = (e: MouseEvent) => {
                e.preventDefault();
                this.redrawPagination(data, currentPage = 1, this.currPageSize);
            };

            const lastPage = (e: MouseEvent) => {
                e.preventDefault();

                if (typeof this.currPageSize === 'number') {
                    this.redrawPagination(data, currentPage = Math.ceil(data.length / this.currPageSize), this.currPageSize);
                }
            };

            if (firstPageBtn && lastPageBtn) {
                firstPageBtn.addEventListener('click', firstPage);
                lastPageBtn.addEventListener('click', lastPage);
            }

            [...dataTable.querySelectorAll('.numPage')].forEach(item => item.addEventListener('click', (e: MouseEvent) => {
                e.preventDefault();

                if (e.currentTarget.innerText) {
                    this.redrawPagination(data, currentPage = Number(e.currentTarget.innerText), this.currPageSize);
                }
            }));
        }
    };

    redrawPagination(data: Data, currentPage: number, numberPerPage: ?number) {
        if (typeof numberPerPage === 'number') {
            let numberOfPages = Math.ceil(data.length / numberPerPage);
            let begin = ((currentPage - 1) * numberPerPage);
            let end = begin + numberPerPage;
            let currData = data.slice(begin, end);

            this.clearTable();
            this.outputTable(currData);

            let dataTable = this.dataTable;
            if (dataTable) {
                let dots = dataTable.querySelectorAll('.dots');
                let btnControl = dataTable.querySelectorAll('.btn-control');
                let numPages = dataTable.querySelectorAll('.btn-control.numPage');
                let startPoint;

                if (currentPage <= [...numPages].length) {
                    startPoint = [...numPages].length - 1;
                    dots[0].style.display = 'none';
                    dots[1].style.display = 'inline';
                } else if (currentPage > numberOfPages - [...numPages].length) {
                    startPoint = numberOfPages - [...numPages].length;
                    dots[0].style.display = 'inline';
                    dots[1].style.display = 'none';
                } else {
                    startPoint = currentPage - 1;
                    [...dots].forEach(item => item.style.display = 'inline');
                }

                [...numPages].reduce((prev, next) => {
                    let foo = Number(prev);
                    return next.innerText = String(++foo);
                }, --startPoint);

                [...btnControl].forEach(item => {
                    Number(item.innerText) === currentPage ? item.classList.add('current') : item.classList.remove('current');
                });
            }
        }
    };

    sortTable(data: Data, clickItem: HTMLElement, clickItemKey: string) {
        if (!clickItem.classList.contains('active')) {
            if (this.dataTable) {
                let prevItem = this.dataTable.querySelector('.btn-sort.active');

                if (prevItem) {
                    prevItem.classList.remove('active');
                }

                clickItem.classList.add('active');
            }
        }

        let order = clickItem.classList.contains('desc') ? -1 : 1;
        data.sort(this.sortValues(clickItemKey, order));
        clickItem.classList.toggle('desc');

        if (!isNaN(this.currPageSize)) {
            this.redrawPagination(data, 1, this.currPageSize);
        } else {
            this.clearTable();
            this.outputTable(data);
        }
    };

    sortValues(key: string, order: number = 1) {
        return (a: {}, b: {}) => {
            if (!a[key]) {
                return 1
            }
            if (!b[key]) {
                return 0
            }

            a[key] instanceof Date ? a[key] = new Date(a[key]) : (typeof a[key] === 'string' ? a[key].toLowerCase() : a[key]);
            b[key] instanceof Date ? b[key] = new Date(b[key]) : (typeof b[key] === 'string' ? b[key].toLowerCase() : b[key]);

            return a[key] > b[key] ? order : (a[key] < b[key] ? -1 * order : 0);
        }
    };

    clearTable() {
        if (this.dataTable) {
            [...this.dataTable.querySelectorAll('.tbody-row')].forEach(item => item.remove());
        }
    };

    outputTable(data: Data) {
        let dataTable = this.dataTable;
        if (dataTable) {
            let tbody = dataTable.querySelector('tbody');
            let objKeys = [...dataTable.querySelectorAll('.btn-sort')].map(item => item.innerText);

            data.forEach(item => {
                let tr = document.createElement('tr');
                if (tbody) {
                    tbody.appendChild(tr);
                }
                tr.dataset.id = item['#'];
                tr.classList.add('tbody-row');

                objKeys.map(key => {
                    let td = document.createElement('td');
                    tr.appendChild(td);
                    td.classList.add('td');
                    if (key) {
                        td.innerText = item[key] ? item[key] : '';
                    }
                });
            });
        }
    };

    build(data: Data) {
        this.data = data;

        this.createDataTable(data);
        this.createPageSize(data);
        this.createTable(data);
        this.outputTable(data);
    };
};