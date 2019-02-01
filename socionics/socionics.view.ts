
namespace $.$$ {

  class $socionics_data extends $mol_object {

    page_def() {
      return {
        'tn': { title: 'Соционические типы' },
        'cp': { title: 'Соционические функции' },
        'it': { title: 'Интертипные отношения' },
        'ma': { title: 'Модель А для всех типов' },
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

    sex_def() {
      return {
        'male': { title: 'Мужской портрет'},
        'female': { title: 'Женский портрет'},
      }
    }

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

    cp_group_def() {
       return {
        'N': {
          'title': 'интуиция',
          'E': { code: 'Ne', title: 'интуиция возможностей', idx: 0 },
          'I': { code: 'Ni', title: 'интуиция времени', idx: 1 },
        },
        'F': {
          'title': 'этика',
          'E': {code: 'Fe', title: 'этика эмоций', idx: 2},
          'I': {code: 'Fi', title: 'этика отношений', idx: 3},
        },
        'T': {
          'title': 'логика',
          'E': {code: 'Te', title: 'деловая логика', idx: 4},
          'I': {code: 'Ti', title: 'структурная логика', idx: 5},
        },
        'S': {
          'title': 'сенсорика',
          'E': {code: 'Se', title: 'волевая сенсорика', idx: 6},
          'I': {code: 'Si', title: 'сенсорика ощущений', idx: 7},
        },
      }
    }

    @ $mol_mem
    cp_def() {
      let result = {}
      this.cp_group_enum().forEach((cp_group : string) => {
          const def = this.cp_group_def()[cp_group]
          this.ei_enum().forEach((ei : string) => {
            const eiDef = def[ei]
            result[eiDef.code] = { title: eiDef.title, idx: eiDef.idx }
          })
          // Object.keys(cpGroupDef).forEach(eiDef => {
          //   if (typeof eiDef == "object") {
          //     result[eiDef.code] = { title: eiDef.title, idx: eiDef.idx }
          //   }
          // })
      })
      return result
    }

    @ $mol_mem
    cp_enum() {
      return Object.keys(this.cp_def())
    }

    @ $mol_mem
    cp_group_enum() {
      return Object.keys(this.cp_group_def())
    }

    @ $mol_mem
    tn_def() {
      let result = {}
      Object.keys(this.quadra_def()).forEach((quadra : string) => {
        const quadraDef = this.quadra_def()[quadra]
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

    @ $mol_mem
    pj_enum() {
      return Object.keys(this.pj_def())
    }

    @ $mol_mem
    ei_enum() {
      return Object.keys(this.ei_def())
    }

    @ $mol_mem
    sex_enum() {
      return Object.keys(this.sex_def())
    }

    @ $mol_mem
    quadra_enum() {
      return Object.keys(this.quadra_def())
    }

    @ $mol_mem
    tn_enum() {
      return Object.keys(this.tn_def())
    }

    @ $mol_mem
    has_selection() {
      return !!this.selected_tn()
    }

    @ $mol_mem
    selected_tn() {
      return this.$.$mol_state_arg.value( 'tn' ) || null
    }

    @ $mol_mem
    selected_cp() {
      return this.$.$mol_state_arg.value( 'cp' ) || null
    }

    @ $mol_mem
    selected_sex() {
      return this.$.$mol_state_arg.value( 'sex' ) || 'male'
    }

    @ $mol_mem
    selected_page() {
      return this.$.$mol_state_arg.value( 'page' ) || 'tn'
    }
  }

  let data : $socionics_data

  export class $socionics extends $.$socionics {
    constructor() {
      super()
      data = new $socionics_data()
    }
    selected_page() {
      return data.selected_page()
    }
    // BUG:
    // Page() {
    //   return (( obj )=>{
    //     return obj
    //   })( new this.$.['$socionics_page_' + this.current_page()] )
    // }
    Page() {
      switch (data.selected_page()) {
        case 'cp': return this.PageCp()
        case 'it': return this.PageIt()
        case 'ma': return this.PageMa()
        default: return this.PageTn()
      }
    }

    socionics_title() {
      return data.page_def()[data.selected_page()].title
    }

    show_description_tn() {
      return !!data.selected_tn()
    }
    show_description_cp() {
      return !!data.selected_cp()
    }
    tn_description_header() {
      return data.tn_def()[data.selected_tn()].title
    }
    tn_description_content_uri() {
      const result = 'static/' + data.selected_tn() + '-' + data.selected_sex() + '.html'
      return result
    }
  }

  export class $socionics_selection_dropper extends $.$socionics_selection_dropper {
    arg() {
      return {
        tn: null as any,
        sex: null as any,
      }
    }
    nonvisible() {
      return !data.has_selection()
    }
  }

  export class $socionics_page_control extends $.$socionics_page_control {

    page_link(id : any) {
      return data.page_def()[id].title
    }

    page_links() {
      return Object.keys(data.page_def()).map((page : string) => this.PageLink(page))
    }

    arg(id : any) {
      return {page: (id == 'tn' ? null : id) }
    }

    is_current(id : any) {
      return id == this.selected()
    }
  }

  $.$socionics_description.prototype.content = function() {
    const uri = this.content_uri()
    const html = this.$.$mol_http.resource(uri).text() as string
    const div = document.createElement('div')
    div.innerHTML = html
    let result : any[] = []
    div.childNodes.forEach((node : Node) => {
      result.push(node)
    })
    return result
  }

  export class $socionics_cp_description extends $.$socionics_cp_description {
    header() {
      return data.cp_def()[data.selected_cp()].title
    }
    content_uri() {
      return 'static/' + data.selected_cp() + '.html'
    }
  }

  export class $socionics_page_it extends $.$socionics_page_it {
    // constructor() {
    //   super()
    //   console.log(this)
    // }
    // cells() {
    //   console.log('$socionics_page_it_top')
    //   let result : any[] = [ this.ListCell(), this.TableCell() ]
    //   return result
    // }
    // rows() {
    //   retu

    // }
  }

  export class $socionics_sex_selector extends $.$socionics_sex_selector {
    items() {
      return data.sex_enum().map((sex : string) => this.Item(sex))
    }
    sex_selector_title(sex : any) {
      return data.sex_def()[sex].title
    }
    sex_selector_arg(sex : any) {
      return { sex: sex == 'male' ? null : sex }
    }
    is_current_sex_selector(sex : any) {
      return sex == data.selected_sex()
    }
  }

  $.$socionics_page.prototype.cells = function() {
    let result : any[] = [ this.TableCell() ]
    if (this.show_description()) {
      result.push(this.DescriptionCell())
    }
    return result
  }

  export class $socionics_cp_icon extends $.$socionics_cp_icon {
    arg() {
      const cp = this.cp()
      return {cp}
    }
    title() {
      return ''
    }
  }

  export class $socionics_cp_table extends $.$socionics_cp_table {
    cols() {
      return [...Array(3).keys()].map((idx : number) => this.Col(idx))
    }
    body() {
      let result : any[] = []
      data.cp_group_enum().forEach((cp_group: string) => {
        data.ei_enum().forEach((ei : string, ei_idx: number) => {
          const cp = data.cp_group_def()[cp_group][ei]['code']
          result.push(this.Row({cp, ei_idx, cp_group}))
        })
        // result = result.concat(
        //   this.QuadraHeader(quadra)
        // ).concat(
        //   data.pj_enum().map((pj: string) => this.QuadraRow({quadra, pj}))
        // )
      })
      return result
    }
    // Row(params) {

    // }
    cells(params : any) {
      const {ei_idx, cp_group, cp} = params
      let result : $mol_view[] = []
      if (ei_idx == 0) {
        result.push(this.RowSpanCell(cp_group))
      }
      result.push(this.IconCell(cp))
      result.push(this.LinkCell(cp))
      return result
    }
    cp_group_title(cp_group : string) {
      return data.cp_group_def()[cp_group].title
    }
    cp_title(cp : string) {
      return data.cp_def()[cp].title
    }
    cp_arg(cp : string) {
      return {cp}
    }
    is_current(cp : string) {
      return data.selected_cp() == cp
    }
    icon_cp(cp : string) {
      return cp
    }
  }

  export class $socionics_tn_table extends $.$socionics_tn_table {

    cols() {
      return [...Array(3).keys()].map((idx : number) => this.Col(idx))
    }

    body() {
      let result : any[] = []
      data.quadra_enum().forEach((quadra: string) => {
        result = result.concat(
          this.QuadraHeader(quadra)
        ).concat(
          data.pj_enum().map((pj: string) => this.QuadraRow({quadra, pj}))
        )
      })
      return result
    }

    quadra_header_sub(quadra : string) {
      const result = [
        this.QuadraCaption(quadra)
      ].concat(
        data.ei_enum().map((ei : string) => this.EiCaption({quadra, ei}))
      )
      return result
    }

    quadra_caption(quadra : string) {
      return quadra + ' квадра'
    }

    ei_title(quadra_ei : any) {
      return data.ei_def()[quadra_ei.ei].title
    }

    pj_title(quadra_pj : any) {
      const {pj} = quadra_pj
      return data.pj_def()[pj].title
    }

    ei_cells( quadra_pj : any ) {
      return data.ei_enum().map((ei : string) => this.EiCell({ei, ...quadra_pj}))
    }

    ei_cell_link_title(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return data.quadra_def()[quadra][pj][ei].title
    }

    ei_cell_link_arg(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return {tn: data.quadra_def()[quadra][pj][ei].code}
    }

    is_current(quadra_pj_ei : any) {
      const {quadra, pj, ei} = quadra_pj_ei
      return data.quadra_def()[quadra][pj][ei].code == data.selected_tn()
    }
  }

}