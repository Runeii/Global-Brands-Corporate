<template>
  <header class="container" v-on:mouseleave="closeSubmenu()">
    <nav>
      <nuxt-link to="/">
        <img class="logo" src="~static/img/logo.png" />
      </nuxt-link>
      <div class="menu-main-menu-container">
        <input type="checkbox" id="menutoggle">
        <label for="menutoggle" onclick><i class="icon-menu"></i></label>
        <ul id="menu-main-menu" class="menu">
          <label for="menutoggle" onclick><i class="icon-menu"></i></label>
          <li v-for="(item, index) in structure" v-if="!menu[item].children" v-on:mouseover="closeSubmenu()">
            <nuxt-link :to="menu[item].slug">{{menu[item].title}}</nuxt-link>
          </li>
          <li v-else v-on:mouseover="openSubmenu(menu[item], index)" :class="{active: activelink === index}">
            <span class="submenutoggle" v-if="menu[item].children" >
              {{menu[item].title}}<i class="icon-down-open"></i>
            </span>
          </li>
        </ul>
      </div>
      <div id="submenu-main-menu" :class="[activemenu ? 'open' : '', 'row']">
        <div class="col-4" v-for="entry in submenu">
          <h4 v-html="entry.title"></h4>
          <p>{{entry.description}}</p>
          <ul v-if="submenus[entry.ID]">
            <li v-for="subentry in submenus[entry.ID]">
              <nuxt-link :to="submenuUrl(subentry.slug, entry.slug)">{{subentry.title}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <ol id="breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" v-for="(breadcrumb, index) in breadcrumbs">
        <nuxt-link :to="breadcrumb.address" itemscope itemtype="http://schema.org/Thing" itemprop="item">
          <span itemprop="name">{{breadcrumb.name}}</span>
        </nuxt-link>
        <meta itemprop="position" :content="(index + 1)" />
      </li>
    </ol>
  </header>
</template>

<script>
export default {
  computed: {
    breadcrumbs () {
      let output = [{
        address: '/',
        name: 'Home'
      }]
      let address = ''
      var split = this.$route.path.split('/')
      split.forEach(function (crumb, index) {
        if (crumb !== '') {
          address += '/' + crumb
          output.push({
            address: address,
            name: crumb.replace(/-/g, ' ')
          })
        }
      })
      return output
    },
    menu () {
      return this.$store.state.menu.menu
    },
    submenus () {
      return this.$store.state.menu.submenus
    },
    structure () {
      return this.$store.state.menu.structure
    }
  },
  data () {
    return {
      submenu: [],
      activemenu: false,
      activelink: false
    }
  },
  methods: {
    openSubmenu (entry, index) {
      this.submenu = entry.children
      this.activemenu = true
      this.activelink = index
    },
    closeSubmenu () {
      this.activemenu = false
      this.activelink = false
    },
    submenuUrl (url, parent) {
      if (parent.endsWith('/')) {
        parent = parent.slice(0, -1)
      }
      if (url.startsWith('#') && url.length > 1) {
        return parent + url
      } else if (url.startsWith('#')) {
        return parent
      } else {
        return url
      }
    }
  }
}
</script>
