
namespace $.$$ {

  function selected_tn(obj : any) {
    return obj.$.$mol_state_arg.value( 'tn' ) || null
  }

  function selected_cp(obj : any) {
    return obj.$.$mol_state_arg.value( 'cp' ) || null
  }

  function selected_sex(obj : any) {
    return obj.$.$mol_state_arg.value( 'sex' ) || 'male'
  }

  function selected_page(obj : any) {
    return obj.$.$mol_state_arg.value( 'page' ) || 'tn'
  }

  function has_selection(obj : any) {
    return !!selected_tn(obj)
  }

  function quadra_def() {
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

  function sex_def() {
    return {
      'male': { title: 'Мужской портрет'},
      'female': { title: 'Женский портрет'},
    }
  }

  // @ $mol_mem
  function tn_def() {
    let result = {}
    Object.keys(quadra_def()).forEach((quadra : string) => {
      const quadraDef = quadra_def()[quadra]
      Object.keys(quadraDef).forEach((pj : string) => {
        const pjDef = quadraDef[pj]
        Object.keys(pjDef).forEach((ei) => {
          const eiDef = pjDef[ei]
          result[eiDef.code] = { title: eiDef.title, idx: eiDef.idx }
        })
      })
    });
    return result
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
      return selected_page(this)
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

    socionics_title() {
      return this.pages_def()[this.selected_page()].title
    }

    drop_args() {
      return {
        tn: null as any,
        sex: null as any,
      }
    }
    is_hidden() {
      return !has_selection(this)
    }
    show_description_tn() {
      return !!selected_tn(this)
    }
    show_description_cp() {
      return !!selected_cp(this)
    }
    tn_description_header() {
      return tn_def()[selected_tn(this)].title
    }
    tn_description_content_uri() {
      const result = 'desc/' + selected_tn(this) + '-' + selected_sex(this) + '.html'
      console.log('tn_description_content_uri', {result})
      return result
    }
  }

  export class $socionics_page_control extends $.$socionics_page_control {

    page_link(id : any) {
      return this.pages_def()[id].title
    }

    page_links() {
      return Object.keys(this.pages_def()).map((page : string) => this.PageLink(page))
    }

    arg(id : any) {
      return {page: (id == 'tn' ? null : id) }
    }

    is_current(id : any) {
      return id == this.selected()
    }
  }

  function description_content(obj : any) {
    // console.log('$socionics_description')
    const uri = obj.content_uri()
    const html = obj.$.$mol_http.resource(uri).text() as string
    const div = document.createElement('div')
    div.innerHTML = html
    let result : any[] = []
    div.childNodes.forEach((node : Node) => {
      result.push(node)
    })
    return result
  }

  export class $socionics_description extends $.$socionics_description {
    content() {
      return description_content(this)
      // console.log('$socionics_description')
      // const uri = this.content_uri()
      // const html = this.$.$mol_http.resource(uri).text() as string
      // const div = document.createElement('div')
      // div.innerHTML = html
      // let result : any[] = []
      // div.childNodes.forEach((node : Node) => {
      //   result.push(node)
      // })
      // return result
    }
  }

  export class $socionics_tn_description extends $.$socionics_tn_description {
    content() {
      return description_content(this)
      // return super.content()
    }
    sex_selectors() {
      return Object.keys(sex_def()).map((sex : string) => this.SexSelector(sex))
    }
    sex_selector_title(sex : any) {
      return sex_def()[sex].title
    }
    sex_selector_arg(sex : any) {
      return { sex: sex == 'male' ? null : sex }
    }
    is_current_sex_selector(sex : any) {
      return sex == selected_sex(this)
    }
  }

  export class $socionics_page extends $.$socionics_page {
    cells() {
      let result : any[] = [ this.TableCell() ]
      // if (selected_tn(this)) {
      if (this.show_description()) {
        result.push(this.DescriptionCell())
      }
      return result
    }
  }

  export class $socionics_tn_table extends $.$socionics_tn_table {

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
      Object.keys(quadra_def()).forEach((quadra: string) => {
        result = result.concat(
          this.QuadraHeader(quadra)
        ).concat(
          Object.keys(this.pj_def()).map((pj: string) => this.QuadraRow({quadra, pj}))
        )
      })
      return result
    }

    quadra_header_sub(quadra : string) {
      const result = [
        this.QuadraCaption(quadra)
      ].concat(
        Object.keys(this.ei_def()).map((ei : string) => this.EiCaption({quadra, ei}))
      )
      return result
    }

    quadra_caption(quadra : string) {
      return quadra + ' квадра'
    }

    ei_title(quadra_ei : any) {
      return this.ei_def()[quadra_ei.ei].title
    }

    pj_title(quadra_pj : any) {
      const {pj} = quadra_pj
      return this.pj_def()[pj].title
    }

    ei_cells( quadra_pj : any ) {
      let result = Object.keys(this.ei_def()).map((ei : string) => this.EiCell({ei, ...quadra_pj}))
      return result
    }

    ei_cell_link_title(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return quadra_def()[quadra][pj][ei].title
    }

    ei_cell_link_arg(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return {tn: quadra_def()[quadra][pj][ei].code}
    }

    is_current(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return quadra_def()[quadra][pj][ei].code == selected_tn(this)
    }
  }

}