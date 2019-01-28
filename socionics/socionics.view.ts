
namespace $.$$ {

  function uri(obj : any, args : any) : string {
    const page = obj.$.$mol_state_arg.value( 'page' ) || 'tn'
    const tn = obj.$.$mol_state_arg.value( 'tn' )
    const urlParams = { page, tn, ...args }
    let result = '#'
    let items : string[] = []
    if (urlParams.page == 'tn') delete urlParams.page
    Object.keys(urlParams).forEach(param => {
      if (urlParams[param]) {
        items.push(param + '=' + urlParams[param])
      }
    })
    return !items.length ? '' : '#' + items.join('&')
  }

  function selected_tn(obj : any) {
    return obj.$.$mol_state_arg.value( 'tn' ) || null
  }

  export class $socionics extends $.$socionics {
    pages_def() {
      return {
        'tn': { title: 'Соционические типы' },
        'cp': { title: 'Соционические функции' },
        'it': { title: 'Интертипные отношения' },
        'ma': { title: 'Модель А для всех типов' },
      }
    }
    selected_page() {
      return this.$.$mol_state_arg.value( 'page' ) || 'tn'
    }
    selected_tn() {
      return selected_tn(this)
    }
    // BUG:
    // page_content() {
    //   return (( obj )=>{
    //     return obj
    //   })( new this.$.['$socionics_page_' + this.current_page()] )
    // }
    page_content() {
      switch (this.selected_page()) {
        case 'cp': return this.PageCp()
        case 'it': return this.PageIt()
        case 'ma': return this.PageMa()
        default: return this.PageTn()
      }
    }
  }

  export class $socionics_page_control extends $.$socionics_page_control {

    page_link(id : any) {
      return this.pages_def()[id].title
    }

    page_links() {
      const result = Object.keys(this.pages_def()).map((page : string) =>
        this.PageLink(page)
      )
      return result
    }

    uri(id : any) {
      // return '#page=' + id
      return uri(this, {page: id})
    }

    is_current(id : any) {
      return id == this.selected()
    }
  }

  export class $socionics_tn_description extends $.$socionics_tn_description {
    description() {
      return this.selected_tn()
    }
    selected_tn() {
      return selected_tn(this)
    }
  }

  export class $socionics_page_tn extends $.$socionics_page_tn {
    cells() {
      let result : any[] = [ this.TnTableCell() ]
      if (this.selected_tn()) {
        result.push(this.TnDescriptionCell())
      }
      return result
      // return [ this.TnTable() ].concat( !this.selected_tn() ? [] : this.TnDescription() )
    }
    selected_tn() {
      return selected_tn(this)
    }
  }

  export class $socionics_tn_table extends $.$socionics_tn_table {

    quadra_def() {
      return {
        'I': {
          'P': {
            'E': { code: 'ENTP', title: "Дон Кихот", idx: 0 },
            'I': { code: 'ISFP', title: "Дюма", idx: 1 },
          },
          'J': {
            'E': { code: 'ESFJ', title: 'Гюго', idx: 2 },
            'I': { code: 'INTJ', title: 'Робеспьер', idx: 3 },
          },
        },
        'II': {
          'P': {
            'E': { code: 'ESTP', title: "Жуков", idx: 4 },
            'I': { code: 'INFP', title: "Есенин", idx: 5 },
          },
          'J': {
            'E': { code: 'ENFJ', title: 'Гамлет', idx: 6 },
            'I': { code: 'ISTJ', title: 'Максим', idx: 7 },
          },
        },
        'III': {
          'P': {
            'E': { code: 'ESFP', title: "Наполеон", idx: 8 },
            'I': { code: 'INTP', title: "Бальзак", idx: 9 },
          },
          'J': {
            'E': { code: 'ENTJ', title: 'Джек', idx: 10 },
            'I': { code: 'ISFJ', title: 'Драйзер', idx: 11 },
          },
        },
        'IV': {
          'P': {
            'E': { code: 'ENFP', title: "Гексли", idx: 12 },
            'I': { code: 'ISTP', title: "Габен", idx: 13 },
          },
          'J': {
            'E': { code: 'ESTJ', title: 'Штирлиц', idx: 14 },
            'I': { code: 'INFJ', title: 'Достоевский', idx: 15 },
          },
        },
      }
    }

    pj_def() {
      return {
        'P': { title: 'иррационалы'},
        'J': { title: 'рационалы' },
      }
    }

    ei_def() {
      return {
        'E': { title: 'экстраверты' },
        'I': { title: 'интраверты' },
      }
    }

    cols() {
      return [...Array(3).keys()].map((idx : number) => this.Col(idx))
    }

    body() {
      let result : any[] = []
      console.log('body')
      Object.keys(this.quadra_def()).forEach((quadra: string) => {
        result = result.concat(
          this.QuadraHeader(quadra)
        ).concat(
          Object.keys(this.pj_def()).map((pj: string) => this.Quadra({quadra, pj}))
        )
        console.log({quadra, result})
      })
      console.log('body', {result})
      return result
    }

    quadra_header_sub(quadra : string) {
      console.log('quadra_header_sub', {quadra})
      const result = [
        this.QuadraCaption(quadra)
      ].concat(
        Object.keys(this.ei_def()).map((ei : string) => this.EiCaption({quadra, ei}))
      )
      console.log('quadra_header_sub', {quadra, result})
      return result
    }

    quadra_caption(quadra : string) {
      console.log('quadra_caption', {quadra})
      return quadra + ' квадра'
    }

    // ei_headers(quadra : string) {
    //   return Object.keys(this.ei_def()).map((ei : string) => this.EiHeader(ei))
    // }

    ei_title(quadra_ei : any) {
      const {ei} = quadra_ei
      const result = this.ei_def()[ei].title
      console.log('ei_title', {ei, result})
      return result
    }

    pj_title(quadra_pj : any) {
      const {pj} = quadra_pj
      return this.pj_def()[pj].title
    }

    ei_cells( quadra_pj : any ) {
      let result = Object.keys(this.ei_def()).map((ei : string) => this.EiCell({ei, ...quadra_pj}))
      console.log({result})
      return result
    }

    ei_cell_link_title(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return this.quadra_def()[quadra][pj][ei].title
    }

    ei_cell_link_uri(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      // return '#tn=' + this.quadra_def()[quadra][pj][ei].code
      return uri(this, {tn: this.quadra_def()[quadra][pj][ei].code})
    }

    selected_tn() {
      return selected_tn(this)
    }

    is_current(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return this.quadra_def()[quadra][pj][ei].code == this.selected_tn()
    }
  }

}